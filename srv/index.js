const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');

const app = express();
const wsInstance = require('express-ws')(app);
const wss = wsInstance.getWss();

app.use(bodyParser.json());

app.post('/post', (req, res) => {
  res.send('okay');

  for (let client of wss.clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(req.body));
    }
  }
});

app.ws('/ws', (ws, req) => {
  ws.on('message', msg => {

  });
});

app.use(express.static(path.join(__dirname, '..', 'build')));

app.listen(3030);
