const {Server} = require('socket.io')
const {io} = require('socket.io-client')
const { createServer } = require('http')

// const server = new Server(3000, {
//   cors: {
//     origin: '*',
//   },
// })

// const namespace = server.of('/socket.io').on('connection', (socket: any) => {
//   console.log('connected')
//   socket.on('message', (data: any) => {
//     console.log('message', data)
//   })
// })

// console.log(namespace)
// console.log(server)

// console.log(namespace instanceof Server)
// console.log(server instanceof Server)

// server.on('connection', (socket: any) => {
//   console.log('connected')
//   socket.on('message', (data: any) => {
//     console.log('message', data)
//   })
// })

// const client = io('http://localhost:3000', {
//   path: '/socket.io',
//   transports: ['websocket'],
// })

// client.on('connect', () => {
//   console.log('client connected')
//   client.emit('message', 'hello')
// })

// client.on('message', (data: any) => {
//   console.log('client message', data)
// }
// )


// function t(...args: [] | [...any] | [number, ...any]) {
//   if (args.length === 0) {
//     return new Server()
//   }else if (args.length === 1) {
//     if (typeof args[0] === 'number') {
//       return new Server(args[0])
//     }else if (typeof args[0] === 'object') {
//       return new Server(undefined, args[0])
//     }else {
//       throw new Error('invalid argument')
//     }
//   }else if (args.length === 2) {
//     if (typeof args[0] === 'number' && typeof args[1] === 'object') {
//       return new Server(args[0], args[1])
//     }else {
//       throw new Error('invalid argument')
//     }
//   }
// }

// t(1,2,4)

const s = createServer((res: any) => {
  res.end('hello')
})

const server1 = new Server(s, {
  cors: {
    origin: '*',
  },
  path: '/socket.io',
})

server1.on('connection', (socket: any) => {
  console.log('connected')
  socket.on('message', (data: any) => {
    console.log('message', data)
  })
})

const server2 = new Server(s, {
  cors: {
    origin: '*',
  },
  path: '/socket.io2',
})

server2.on('connection', (socket: any) => {
  console.log('connected')
  socket.on('message', (data: any) => {
    console.log('message', data)
  })
})

const client1 = io('http://localhost:3000', {
  path: '/socket.io',
  transports: ['websocket'],
})

client1.on('connect', () => {
  console.log('client connected')
  client1.emit('message', 'hello')
} )

const client2 = io('http://localhost:3000', {
  path: '/socket.io2',
  transports: ['websocket'],
})

client2.on('connect', () => {
  console.log('client connected')
  client2.emit('message', 'hello')
}
)

s.listen(3000)

s