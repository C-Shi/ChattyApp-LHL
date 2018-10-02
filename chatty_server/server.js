const express = require('express');
const SocketServer = require('ws').Server;

const PORT = 3001;

const server = express().use(express.static('public')).listen(PORT, '127.0.0.1', 'localhost', () => {console.log('listen to PORT 3001')});

// create websocket server
const wss = new SocketServer({ server });

// setup callback that will run when a client connects to server
wss.on('connection', ws => {
  // listen to the incomming message and log them out
  ws.on('message', data => {
    const msg = JSON.parse(data);
    console.log(`${msg.username} said ${msg.content}`)
  });
 
})

