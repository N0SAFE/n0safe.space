import { Guard, LoggerCluster } from './cluster.socket.io'

export function createCluster(
  port: number,
  { portRange, openOnStart = true }: { portRange: number[]; openOnStart: boolean },
  guard: Guard = {}
): LoggerCluster {
  return new LoggerCluster(port, { portRange, openOnStart }, guard)
}

export function createServer() {}

export { LoggerCluster }
