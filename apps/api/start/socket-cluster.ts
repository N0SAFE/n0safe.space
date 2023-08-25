import { createCluster } from '../Service/socket-logger/server'
import Env from '@ioc:Adonis/Core/Env'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import Client from '../Service/socket-logger/client/utils/Client'
import clc from 'cli-color'

const clusterInfo = JSON.parse(Env.get('SOCKET_CLUSTER_INFO', '{"port": 4000, "path": "/"}'))
const serversInfo = JSON.parse(
  Env.get('SOCKET_CLUSTER_SERVERS_INFO', '[{"port": 4000, "path": "/1"}]')
)

new Promise((resolve, reject) => {
  const client = new Client()
  client.onClusterConnect(async () => {
    reject(new Error('a cluster is already running'))
  })
  client.connect({ host: 'localhost', protocol: 'http', ...clusterInfo })
  setTimeout(() => {
    resolve(true)
    client.disconnect()
  }, 500)
})
  .then(function () {
    console.log(clc.green('no cluster running, starting one'))
    createCluster(
      clusterInfo,
      serversInfo,
      { openOnStart: true },
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
              message: 'Can\'t authenticate, invalid token',
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
    console.log(clc.red('a cluster is already running'))
  })
