import { default as io, Socket } from 'socket.io-client'
import { EventEmitter } from 'events'
import { AdvancedSocketMethods } from '../../utils'
import clc from 'cli-color'

export interface IInfo {
  host: string
  port: number
  path: string
  protocol: string
}

export interface IAutorestartBehavior {
  restartOnDisconnect?: {
    active?: boolean
    timeout?: number
  }
  restartOnError?: {
    active?: boolean
    timeout?: number
  }
}

export default class Client implements AdvancedSocketMethods {
  private socket?: Socket
  private readonly events: EventEmitter = new EventEmitter()
  constructor(private info: IInfo) {
    this.connect(info)
  }

  private connectErrorFn: (err: any) => void = (err) => {
    this.events.emit('connect_error', err)
  }
  private connectFn: () => void = async () => {
    const [data] = await this.awaitFor('connection')
    if (data.status === 'KO') {
      throw new Error(data.message || 'unknown error')
    }
    if (data.isCluster) {
      this.events.emit('clusterConnect')
    } else {
      this.events.emit('serverConnect')
    }
    console.log('connected')
    this.events.emit('connect')
  }
  private disconnectFn: () => void = () => {
    this.removeAllListeners()
    this.events.emit('disconnect')
  }
  private errorFn: (err: any) => void = (err) => {
    console.error(clc.red('ERR', JSON.stringify(err)))
  }

  emitOnClusterConnection(
    evt: string,
    callback: (() => any[]) | (() => Promise<any[]>) | any,
    ...args: any[]
  ) {
    this.onClusterConnect(async () => {
      if (typeof callback === 'function') {
        this.emit(evt, ...(await callback()))
      } else {
        this.emit(evt, callback, ...args)
      }
    })
    return this
  }

  emitOnServerConnection(
    evt: string,
    callback: (() => any[]) | (() => Promise<any[]>) | any,
    ...args: any[]
  ) {
    this.onServerConnect(async () => {
      if (typeof callback === 'function') {
        this.emit(evt, ...(await callback()))
      } else {
        this.emit(evt, callback, ...args)
      }
    })
    return this
  }

  listenOnClusterConnection(evt: string, callback: (socket: Socket) => void) {
    this.onClusterConnect(() => {
      this.on(evt, callback)
    })
    return this
  }

  listenOnServerConnection(evt: string, callback: (socket: Socket) => void) {
    this.onServerConnect(() => {
      this.on(evt, callback)
    })
    return this
  }

  connect(newInfo: IInfo) {
    console.log(newInfo)
    this.info = {
      ...this.info,
      ...newInfo,
    }
    if (this.socket) {
      this.removeAllListeners()
      this.clearPrivateEvents()
      this.socket.close()
      delete this.socket
    }
    this.socket = io(
      `${this.info.protocol}://${this.info.host}:${this.info.port}${this.info.path}`,
      {
        autoConnect: true,
        reconnection: true,
      }
    )
    console.log(
      `connecting to ${this.info.protocol}://${this.info.host}:${this.info.port}${this.info.path}`
    )
    this.onRedirect((info) => {
      this.connect(info)
    })
    this.socket.on('connect_error', this.connectErrorFn)
    this.socket.on('disconnect', this.disconnectFn)
    this.socket.on('connect', this.connectFn)
    this.socket.on('error', this.errorFn)
    return this
  }

  private clearPrivateEvents() {
    const list: [string, (...args: any[]) => any][] = [
      ['connect_error', this.connectErrorFn],
      ['connect', this.connectFn],
      ['disconnect', this.disconnectFn],
    ]
    list.forEach(([event, callback]) => {
      if (this.socket) {
        this.socket.off(event, callback)
      }
    })
  }

  removeAllListeners(
    list: (string | (() => void))[] = [],
    listType: 'black' | 'white' = 'black'
  ) {
    const socket = this.socket as any
    const callbacksList: [string, (() => void)[]][] = Object.entries(
      socket._callbacks
    )

    callbacksList.forEach(([event, callbacks]) => {
      if (event.startsWith('$')) {
        event = event.slice(1)
      }
      ;[...callbacks].forEach((callback) => {
        if (list.includes(event) || list.includes(callback)) {
          if (
            listType === 'white' &&
            ![this.connectErrorFn, this.connectFn, this.disconnectFn].includes(
              callback
            )
          ) {
            socket.off(event, callback)
          }
          return
        }
        if (
          listType === 'black' &&
          ![this.connectErrorFn, this.connectFn, this.disconnectFn].includes(
            callback
          )
        ) {
          socket.off(event, callback)
        }
      })
    })

    return this
  }

  onRedirect(callback: (info: IInfo) => void) {
    if (this.socket) {
      this.socket.on('redirect', callback)
    }
    return this
  }

  onServerConnect(callback: () => void) {
    this.events.on('serverConnect', callback)
    return this
  }

  onClusterConnect(callback: () => void) {
    this.events.on('clusterConnect', callback)
    return this
  }

  onConnect(callback: () => void) {
    this.events.on('connect', callback)
    return this
  }

  onConnectOnce(callback: () => Promise<boolean> | boolean) {
    const fn = async () => {
      if (await callback()) {
        this.events.off('connect', fn)
      }
    }
    this.events.on('connect', fn)
    return this
  }

  onDisconnect(callback: () => void) {
    this.events.on('disconnect', callback)
    return this
  }

  onError(callback: (err: any) => void) {
    if (this.socket) {
      this.socket.on('connect_error', callback)
    }
    return this
  }

  on(event: string, callback: (...args: any[]) => void) {
    if (this.socket) {
      this.socket.on(event, callback)
    }
    return this
  }

  emit(event: string, ...args: any[]) {
    if (this.socket) {
      this.socket.emit(event, ...args)
    }
    return this
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
    return this
  }

  get connected() {
    return this.socket?.connected
  }

  get disconnected() {
    return this.socket?.disconnected
  }

  get id() {
    return this.socket?.id
  }

  awaitFor(ev: string, callback?: (...args: any[]) => boolean): Promise<any> {
    return new Promise((resolve) => {
      if (this.socket) {
        this.socket.on(ev, (...args: any[]) => {
          if (callback) {
            if (callback(...args)) {
              resolve(args)
            }
          } else {
            resolve(args)
          }
        })
        return
      }
      resolve([null])
    })
  }

  request(ev: string, ...args: any[]) {
    this.emit(ev, ...args)
    return this.awaitFor(ev)
  }
}
