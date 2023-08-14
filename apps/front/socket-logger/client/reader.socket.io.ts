import { Client } from './utils'
import chalk from 'chalk'

type payload = {
  type: 'reader'
  space: string
  [key: string]: any
}
export interface ReaderGuard {
  sendRequestPayloadOnClusterConnect?: (payload: payload) => payload
  sendRequestPayloadOnServerConnect?: (payload: payload) => payload
}

class LoggerReaderClient extends Client {
  constructor(
    info: any,
    options: { space: string; keepAlive: boolean; timeout: number },
    private readonly guard: ReaderGuard = {}
  ) {
    super(info)

    this.guard.sendRequestPayloadOnClusterConnect =
      this.guard.sendRequestPayloadOnClusterConnect || ((payload) => payload)
    this.guard.sendRequestPayloadOnServerConnect =
      this.guard.sendRequestPayloadOnServerConnect || ((payload) => payload)

    this.onClusterConnect(() => {
      console.log(chalk.yellow('Cluster detected, waiting for connection...'))
      this.emit(
        'request',
        this.guard.sendRequestPayloadOnClusterConnect?.({
          type: 'reader',
          space: options.space,
        })
      )
    })

    this.onServerConnect(() => {
      console.log(chalk.green('Connection established'))
      this.emit(
        'subscribe',
        this.guard.sendRequestPayloadOnServerConnect?.({
          type: 'reader',
          space: options.space,
        })
      )
    })

    this.onDisconnect(() => {
      console.log(chalk.red('Disconnected from server'))
    })
  }
}

// const host: string = "localhost";

// new ReaderClient({ port: options.port, host, protocol: "http", path: "" });

export default LoggerReaderClient
