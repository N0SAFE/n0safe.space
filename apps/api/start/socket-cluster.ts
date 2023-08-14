import { createCluster } from '../Service/socket-logger/server'
import Env from '@ioc:Adonis/Core/Env'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Client from '../Service/socket-logger/client/utils/Client'
import clc from 'cli-color'

const clusterPort = Env.get('SOCKET_CLUSTER_PORT', 4000)
const jsonServerPortRange = Env.get('SOCKET_CLUSTER_SERVER_PORT_RANGE', '[4000]')

const serverPortRange = JSON.parse(jsonServerPortRange)
if (!Array.isArray(serverPortRange)) {
  throw new Error('SOCKET_CLUSTER_SERVER_PORT_RANGE must be an array')
}

new Promise((resolve, reject) => {
  const client = new Client()
  client.onClusterConnect(async () => {
    reject(new Error('a cluster is already running'))
  })
  client.connect({ host: 'localhost', port: clusterPort, path: '', protocol: 'http' })
  setTimeout(() => {
    resolve(true)
    client.disconnect()
  }, 500)
})
  .then(function () {
    console.log(clc.red('no cluster running, starting one'))
    createCluster(
      clusterPort,
      { portRange: serverPortRange, openOnStart: true },
      {
        // @ts-ignore
        verifyServerSubscription: async (connection, data) => {
          const { token } = data
          if (!token) {
            // login as guest
            return {
              success: true,
              message: 'Guest login',
            }
          }

          const { request, auth } = HttpContext.create('/', {})
          request.headers().authorization = token
          try {
            await auth.use('jwt').authenticate()
          } catch {
            return {
              success: false,
              message: "Can't authenticate, invalid token",
            }
          }

          return {
            success: true,
          }
        },
      }
    )
  })
  .catch(function () {
    console.log(clc.green('a cluster is already running'))
  })
