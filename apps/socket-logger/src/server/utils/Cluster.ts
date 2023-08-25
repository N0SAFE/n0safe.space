import Server from './Server'
// import { Server as _Server } from 'socket.io'
import Connection from './Connection'
import { AdvancedMap } from '../../utils'
import { createServer } from 'http'
import { IsHttpServer } from '../../utils/types'

function dummyFunction(...args: any[]) {
  args
}

export default class Cluster<GlobalStore, ServerStore> extends Server {
  public servers: AdvancedMap<Server, ServerStore>
  public httpServerMap: AdvancedMap<number, IsHttpServer> = new AdvancedMap()
  public isOpened = false
  constructor(
    clusterInfo: any = { port: 65000, path: '/' },
    private readonly serversInfo: any[] = [{ port: 65001, path: '/' }],
    private readonly store = {} as GlobalStore,
  ) {
    super(clusterInfo)

    this.servers = new AdvancedMap<Server, ServerStore>()
    this.emit('beforeCreateServers')
    dummyFunction(this.store) // this function is called to avoid error on the ts parser for the unused variable store
  }

  public onConnection(
    callback: (connection: Connection) => Promise<any> | any,
  ) {
    this.on('connection', async (socket) => {
      const connection = new Connection(this, socket)
      this.emit('connection', {
        isCluster: true,
      })
      const info = await callback(connection)
      this.emit('redirect', info)
    })
    return this
  }

  public open(port: number) {
    this.emit('beforeOpen')
    super.open(this.getHttpServer(port))
    this.emit('open')
    this.isOpened = true
    return this
  }

  public close() {
    this.emit('beforeClose')
    this.close()
    this.servers.forEach((_, server) => {
      server.close()
    })
    this.emit('close')
    this.isOpened = false
    return this
  }

  public serverExists(port: number, path?: string) {
    if (path) {
      return this.servers.some(
        (server) => server.port === port && server.path() === path,
      )
    }
    return this.servers.some((server) => server.port === port)
  }

  public findServer(verify: (server: Server, store: ServerStore) => boolean) {
    return this.servers.find(verify)
  }

  public findServerByPort(port: number) {
    const server = this.findServer((server: Server, _: ServerStore) => {
      _
      return server.port === port
    })
    if (server) {
      return server
    }
    throw new Error('server not found')
  }

  public portIsInRange(port: number) {
    return this.serversInfo.some((serverInfo) => serverInfo.port === port)
  }

  public getHttpServer(port: number): IsHttpServer {
    if (this.httpServerMap.has(port)) {
      return this.httpServerMap.get(port) as IsHttpServer
    }
    const httpServer = createServer() as IsHttpServer
    httpServer.listen(port)
    httpServer.port = port
    httpServer.setMaxListeners(0)
    this.httpServerMap.set(port, httpServer)
    return httpServer
  }

  public pathIsAllowed(path: string) {
    return this.serversInfo.some((serverInfo) =>
      serverInfo.path instanceof RegExp
        ? serverInfo.path.test(path)
        : serverInfo.path === path,
    )
  }

  public redirect(
    server: Server,
    info: { port: number; path?: string },
    payload?: any,
  ) {
    server.emit('redirect', {
      type: 'redirected',
      data:
        'redirected to port ' +
        info.port +
        (info.path && ' and path ' + info.path),
      port: info.port,
      path: info.path || '',
      payload: payload,
    })
  }

  public createServer(
    serverInfo: { port: number; path?: string } & any,
    store: ServerStore,
    callback?: ({
      server,
      store,
    }: {
      server: Server
      store: ServerStore
    }) => void,
  ) {
    if (!this.portIsInRange(serverInfo.port)) {
      throw new Error('port is out of range')
    }
    if (serverInfo.path && !this.pathIsAllowed(serverInfo.path)) {
      throw new Error('path is not allowed')
    }
    if (this.serverExists(serverInfo.port, serverInfo.path)) {
      return this.findServerByPort(serverInfo.port)
    }
    const server = new Server(this.getHttpServer(serverInfo.port), serverInfo)
    this.servers.set(server, store)
    callback?.({ server, store })
    return server
  }

  public createServers(
    store: (port: number, path: string, index: number) => ServerStore,
    callback?: ({
      server,
      store,
    }: {
      server: Server
      store: ServerStore
    }) => void,
    onServerError: (error: Error, store: ServerStore) => void = () => {
      return undefined
    },
  ) {
    this.serversInfo.forEach(({ port, path }, index) => {
      const Tstore = store(port, path, index)
      this.createServer({ port, path }, Tstore, callback)
    })
    onServerError
  }
}
