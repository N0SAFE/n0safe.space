import { Server as _Server } from 'socket.io'
import Connection from './Connection'
import { AdvancedSocketMethods } from '../../utils'
import { IsHttpServer } from '../../utils/types'
import { Server as HttpServer } from 'http'

export default class Server extends _Server implements AdvancedSocketMethods {
  public port: number | undefined
  public connections = new Set<Connection>()
  public opened = false

  constructor(...args: [] | [...any] | [number, ...any]) {
    let _args = args as any[]
    let srv: number | undefined | IsHttpServer
    if (typeof args[0] === 'number' || args[0] instanceof HttpServer) {
      srv = args[0]
      _args = args.slice(1)
    }
    _args[0].path =
      _args[0].path[0] === '/' ? _args[0].path : '/' + _args[0].path
    super(..._args)
    if (srv) {
      this.open(srv)
    }

    this.on('connection', (socket) => {
      const connection = new Connection(this, socket)
      this.connections.add(connection)
      socket.on('disconnect', () => {
        this.connections.delete(connection)
      })
    })
  }

  public onConnection(callback: (connection: Connection) => any) {
    this.on('connection', (socket) => {
      const connection = new Connection(this, socket)
      this.emit('connection', {
        isCluster: false,
      })
      callback(connection)
    })
  }

  public open(srv: number | HttpServer) {
    this.opened = true
    if (typeof srv === 'number') {
      this.port = srv
    } else if (srv instanceof HttpServer) {
      const httpServer = srv as IsHttpServer
      this.port = httpServer.port
    }
    this.listen(srv)
  }

  public awaitFor(eventName, _callback: (...args) => boolean = () => true) {
    const callback = function (...args) {
      return _callback(...args)
    }

    return new Promise((resolve) => {
      this.on(eventName, (data) => {
        if (callback(data)) {
          resolve(data)
          this.off(eventName, callback)
        }
      })
    })
  }

  public request(ev: string, ...args: any) {
    this.emit(ev, ...args)
    return this.awaitFor(ev)
  }

  public findConnection(search) {
    Array.from(this.connections).find(search)
  }
}
