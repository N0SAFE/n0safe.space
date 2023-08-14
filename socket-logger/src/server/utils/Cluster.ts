import Server from './Server'
import { Server as _Server } from 'socket.io'
import Connection from './Connection'
import { AdvancedMap } from '../../utils'

function dummyFunction(...args: any[]) {
  args
}

export default class Cluster<GlobalStore, ServerStore> extends Server {
  public servers: AdvancedMap<Server, ServerStore>
  public isOpened = false
  constructor(
    private readonly portRange: number[] = [],
    private readonly store = {} as GlobalStore
  ) {
    super()
    this.servers = new AdvancedMap<Server, ServerStore>()
    this.emit('beforeCreateServers')
    dummyFunction(this.store) // this function is called to avoid error on the ts parser for the unused variable store
  }

  public onConnection(callback: (connection: Connection) => Promise<any> | any) {
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
    super.open(port)
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

  public serverExists(port: number) {
    return this.servers.some((server) => server.port === port)
  }

  public findServer(verify: (server: Server, store: ServerStore) => boolean) {
    return this.servers.find(verify)
  }

  public findServerByPort(port: number) {
    const server = this.findServer((server: Server, _: ServerStore) => server.port === port)
    if (server) {
      return server
    }
    throw new Error('server not found')
  }

  public portIsInRange(port: number) {
    return this.portRange.includes(port)
  }

  public redirect(server: Server, port: number, payload?: any) {
    server.emit('redirect', {
      type: 'redirected',
      data: 'redirected to ' + port,
      port: port,
      payload: payload,
    })
  }

  public createServer(
    port: number,
    store: ServerStore,
    callback?: ({ server, store }: { server: Server; store: ServerStore }) => void
  ) {
    if (!this.portIsInRange(port)) {
      throw new Error('port is out of range')
    }
    if (this.serverExists(port)) {
      return this.findServerByPort(port)
    }
    const server = new Server(port)
    this.servers.set(server, store)
    callback?.({ server, store })
    return server
  }

  public createServers(
    store: (port: number, index: number) => ServerStore,
    callback?: ({ server, store }: { server: Server; store: ServerStore }) => void, // @ts-ignore
    onServerError: (error: Error, store: ServerStore) => void = () => {}
  ) {
    this.portRange.forEach((port, index) => {
      const Tstore = store(port, index)
      this.createServer(port, Tstore, callback)
    })
  }
}
