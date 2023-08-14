import { Server as _Server } from 'socket.io'
import Connection from './Connection'
import { AdvancedSocketMethods } from '../../utils'

export default class Server extends _Server implements AdvancedSocketMethods {
  public connections = new Set<Connection>()
  public port: number
  constructor(...args: [] | [any] | [number, any]) {
    let port: number | undefined
    const Targs = args as any[]
    if (Targs.length === 0) {
      Targs.push({
        allowRequest: (_: any, callback: any) => {
          callback(null, true)
        },
        cors: {
          origin: '*',
        },
      })
    } else if (Targs.length === 1) {
      if (typeof Targs[0] === 'number') {
        Targs.push({
          allowRequest: (_: any, callback: any) => {
            callback(null, true)
          },
          cors: {
            origin: '*',
          },
        })
        port = Targs[0]
      } else if (typeof Targs[0] === 'object') {
        Targs[0].allowRequest = (_: any, callback: any) => {
          callback(null, true)
        }
        args[0].cors = {
          origin: '*',
        }
      } else {
        throw new Error('invalid argument')
      }
    } else if (Targs.length === 2) {
      if (typeof Targs[0] === 'number' && typeof Targs[1] === 'object') {
        Targs[1].allowRequest = (_: any, callback: any) => {
          callback(null, true)
        }
        args[1].cors = {
          origin: '*',
        }
        port = Targs[0]
      } else {
        throw new Error('invalid argument')
      }
    } else {
      throw new Error('invalid argument')
    }
    super(...Targs)

    this.port = port as number
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

  public open(port) {
    this.listen(port, {
      cors: {
        origin: '*',
      },
    })
  }

  public awaitFor(eventName, _callback: (...args) => boolean = () => true) {
    const self = this
    const callback = function (...args) {
      return _callback(...args)
    }

    return new Promise((resolve) => {
      self.on(eventName, (data) => {
        if (callback(data)) {
          resolve(data)
          self.off(eventName, callback)
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
