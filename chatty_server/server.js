const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

const server = express().use(express.static('public')).listen(PORT, '127.0.0.1', 'localhost', () => {console.log('listen to PORT 3001')});

// create websocket server
const wss = new SocketServer({ server });

// setup callback that will run when a client connects to server
wss.on('connection', ws => {
  console.log('client connected');
  // setup a callback when a client close the socket
  ws.on('close', () => {console.log('client disconnected')})
})

