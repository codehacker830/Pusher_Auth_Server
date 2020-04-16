const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher'); 
require('dotenv').config()
const router = express.Router();
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const pusher = new Pusher({
    appId: process.env.APP_ID,
    key: process.env.APP_KEY,
    secret: process.env.APP_SECRET,
    cluster: process.env.APP_CLUSTER,
    useTLS: true
  });
console.log("____process.env.APP_ID___", process.env.APP_ID)
app.get('/test', function (req, res) { // to test if the server is running
    res.send('___all green____');
});

 // to authenticate users
 app.post('/pusher/auth', function(req, res) {
    const socketId = req.body.socket_id;
    const channel = req.body.channel_name;
    const auth = pusher.authenticate(socketId, channel);
    res.send(auth);
  });

//   use this  before the pusher.authenticate call to check if the request is valid or not
//   var origin = req.get('origin');
//   if(origin == 'YOUR BLOG DOMAIN NAME OR IP'){
//     // authenticate the request
//   }

var port = 5000;
app.listen(port);
