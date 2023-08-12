import clc from 'cli-color'
import { Client } from './utils'

type payload = {
  type: 'writer'
  space: string
  [key: string]: any
}
export interface WriterGuard {
  sendRequestPayloadOnClusterConnect?: (payload: payload) => payload
  sendRequestPayloadOnServerConnect?: (payload: payload) => payload
}

class LoggerWriterClient extends Client {
  constructor(
    info: any,
    options: { space: string; keepAlive: boolean; timeout: number },
    private readonly guard: WriterGuard
  ) {
    super(info)
    this.guard.sendRequestPayloadOnClusterConnect =
      this.guard.sendRequestPayloadOnClusterConnect || ((payload) => payload)
    this.guard.sendRequestPayloadOnServerConnect =
      this.guard.sendRequestPayloadOnServerConnect || ((payload) => payload)

    this.onClusterConnect(() => {
      console.log(clc.yellow('Cluster detected, waiting for connection...'))
      this.emit(
        'request',
        this.guard.sendRequestPayloadOnClusterConnect?.({
          type: 'writer',
          space: options.space,
        })
      )
    })

    this.onServerConnect(() => {
      console.log(clc.green('Connection established'))
      this.request(
        'subscribe',
        this.guard.sendRequestPayloadOnServerConnect?.({
          type: 'writer',
          space: options.space,
        })
      )
    })

    this.onDisconnect(() => {
      console.log(clc.red('Disconnected from server'))
      this.removeAllListeners()
      this.onConnect(async () => {
        console.log(clc.green('Connected to server'))
      })
    })
  }
}

// const host: string = "localhost";

// new WriterClient({ port: options.port, host, protocol: "http", path: "" });

export default LoggerWriterClient
