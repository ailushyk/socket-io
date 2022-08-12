import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io('http://localhost:3010', {
  withCredentials: true,
})

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState<string>(null!)

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    })

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
    }
  }, [])

  const sendPing = () => {
    socket.volatile.emit('ping')
  }

  return (
    <div>
      <div>app</div>
      <div>status: {isConnected ? 'connected' : 'disconnected'}</div>
      <p>Connected: {'' + isConnected}</p>
      <p>Last pong: {lastPong || '-'}</p>
      <button onClick={sendPing}>Send ping</button>
    </div>
  )
}

export default App
