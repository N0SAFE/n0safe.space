import LoggerReaderClient from '../socket-logger/client/reader.socket.io'
import { userStore } from '@/store/user.store'

export default function useSocketLogger() {
  const store = userStore()
  return function ({
    port,
    host,
    protocol = 'http',
    path = '',
    space = 'default',
    keepAlive = true,
    timeout = 1000,
  }) {
    console.log(host)
    return new LoggerReaderClient(
      { port, host, protocol, path },
      { space, keepAlive, timeout },
      {
        sendRequestPayloadOnServerConnect: function (payload) {
          payload.token = store.state.jwt
            ? store.state.jwt?.type?.toUpperCase() +
              ' ' +
              store.state.jwt?.token
            : null
          return payload
        },
      }
    )
  }
}
