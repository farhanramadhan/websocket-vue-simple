import { io } from 'socket.io-client'

class SocketioService {
  socket
  constructor() {}

  setupSocketConnection(token) {
    // eslint-disable-next-line no-undef
    const URL = 'http://52.221.232.148:3000'
    this.socket = io(URL, { auth: { token } })

    console.log(`Connecting socket...`)

    this.socket.emit('my message', 'Hello there from Vue.')

    this.socket.on('my broadcast', (data) => {
      console.log(data)
    })
  }

  // Handle message receive event
  subscribeToMessages(cb) {
    if (!this.socket) return true
    this.socket.on('message', (msg) => {
      console.log('Room event received!')
      return cb(null, msg)
    })
  }

  sendMessage({ message, roomName }, cb) {
    if (this.socket) this.socket.emit('message', { message, roomName }, cb)
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect()
    }
  }
}

export default new SocketioService()
