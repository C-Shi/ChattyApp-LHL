const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuidv1= require('uuid/v1');
const Filter = require('bad-words');
const filter = new Filter({ placeHolder: 'x'});

const PORT = 3001;

const server = express().use(express.static('public')).listen(PORT, '127.0.0.1', 'localhost', () => {console.log('listen to PORT 3001')});

// create websocket server
const wss = new SocketServer({ server });

// setup callback that will run when a client connects to server
wss.on('connection', ws => {
  // listen to the incomming message and log them out

  // retrieve the total number of active users
  const getTotalUser = () => {
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        console.log(client);
        client.send(wss.clients.size);
      }
    })
  }

  // when there is a connection, all this method
  getTotalUser();
  
  // when a connection is closed, again call this method
  ws.on('close', ws => {
    getTotalUser();
  })

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
    incomingMsg.content = filter.clean(incomingMsg.content);
    const id = uuidv1();
    const outgointMsg = JSON.stringify({id, ...incomingMsg});
    // execute the defined function to send data
    wss.broadcast(outgointMsg);
  });

 
})

