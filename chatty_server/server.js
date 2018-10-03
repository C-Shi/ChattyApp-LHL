const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1= require('uuid/v1');

const PORT = 3001;

const server = express().use(express.static('public')).listen(PORT, '127.0.0.1', 'localhost', () => {console.log('listen to PORT 3001')});

// create websocket server
const wss = new SocketServer({ server });

// setup callback that will run when a client connects to server
wss.on('connection', ws => {
  // listen to the incomming message and log them out

  // attach broadcast function -- this should be defined before ws.on() otherwise will throw error
  wss.broadcast = function broadcast(data) {
    // need to catch all the clients at this point
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  };
  ws.on('message', data => {
    const incomingMsg = JSON.parse(data);
    const id = uuidv1();
    const outgointMsg = JSON.stringify({id, ...incomingMsg});
    // execute the defined function to send data
    wss.broadcast(outgointMsg);
  });
 
})

