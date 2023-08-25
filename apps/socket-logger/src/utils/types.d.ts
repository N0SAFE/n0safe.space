import { Server as _HttpServer } from 'http'

export interface IsInfo {
  host: string
  port?: number | undefined
  path: string
  protocol: string
}

export type IsHttpServer = _HttpServer & { port?: number }
