import { spawn } from 'child_process'
import clc from 'cli-color'
import LoggerWriterClient, { WriterGuard } from './writer.socker.io'
import LoggerReaderClient, { ReaderGuard } from './reader.socket.io'
export function createAdminReader() {}

export function createReader(
  {
    port,
    host,
    protocol = 'http',
    path = '',
    space = 'default',
    keepAlive = true,
    timeout = 1000,
  }: {
    port: number
    host: string
    protocol?: string
    path?: string
    space?: string
    keepAlive?: boolean
    timeout?: number
  },
  guard?: ReaderGuard
): LoggerReaderClient {
  return new LoggerReaderClient(
    { port, host, protocol, path },
    { space, keepAlive, timeout },
    guard
  )
}

export function createWriter(
  {
    port,
    host,
    protocol = 'http',
    path = '',
    space = 'default',
    keepAlive = true,
    timeout = 1000,
  }: {
    port: number
    host: string
    protocol?: string
    path?: string
    space?: string
    keepAlive?: boolean
    timeout?: number
  },
  guard: WriterGuard
): LoggerWriterClient {
  return new LoggerWriterClient(
    { port, host, protocol, path },
    { space, keepAlive, timeout },
    guard
  )
}

export function createServiceWriter(
  {
    port,
    host,
    protocol = 'http',
    path = '',
    space = 'default',
    keepAlive = true,
    timeout = 1000,
  }: {
    port: number
    host: string
    protocol?: string
    path?: string
    space?: string
    keepAlive?: boolean
    timeout?: number
  },
  guard: WriterGuard,
  { command }: { command: string }
): LoggerWriterClient {
  const writer = createWriter({ port, host, protocol, path, space, keepAlive, timeout }, guard)
  const subProcess = spawn(command, {
    shell: true,
    stdio: 'pipe',
    env: {
      ...process.env,
    },
  })
  subProcess.on('exit', (code) => {
    console.log(clc.blue('Process exited with code ' + code))
    writer.emit('data', {
      type: 'exit',
      message: 'Process exited with code ' + code,
      code,
    })
    if (code !== null) {
      process.exit(code)
    }
  })
  subProcess.stdout.on('data', (data) => {
    console.log('stdout: ' + data.toString())
    writer.emit('data', data.toString())
  })
  return writer
}

export { LoggerReaderClient, LoggerWriterClient }
