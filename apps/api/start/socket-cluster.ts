import { server } from '@n0safe/logger'
import Env from '@ioc:Adonis/Core/Env'
import HttpContext from '@ioc:Adonis/Core/HttpContext'
import AdonisServer from '@ioc:Adonis/Core/Server'

const { createCluster } = server

const clusterPath = Env.get('SOCKET_CLUSTER_INFO', 'cluster')
const serversPath = JSON.parse(
  Env.get('SOCKET_CLUSTER_SERVERS_INFO', '["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]')
)
const port = Env.get('PORT', '3333')

// @ts-ignore
AdonisServer.instance.port = Number(port)
AdonisServer.instance?.setMaxListeners(0)

createCluster(
  { path: clusterPath, httpServer: AdonisServer.instance },
  serversPath.map((serverpath) => {
    return { path: serverpath, httpServer: AdonisServer.instance }
  }),
  { openOnStart: true },
  {
    // @ts-ignore
    verifyClusterConnection: async (connection, data) => {
      return {
        success: true,
        message: 'Connection verified',
      }
    },
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
