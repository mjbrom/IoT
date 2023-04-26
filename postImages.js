var firebase = require("firebase/app");
const { getStorage, uploadBytes, ref } = require("firebase/storage");
var fs = require('fs');
var base64ToImage = require('base64-to-image');
var sockets = [];


const firebaseConfig = {
  apiKey: "AIzaSyDW5f707W16ftUpvJ7h1n-M2GrM-hFzZZw",
  authDomain: "iot-project-678a0.firebaseapp.com",
  projectId: "iot-project-678a0",
  storageBucket: "iot-project-678a0.appspot.com",
  messagingSenderId: "1039595169607",
  appId: "1:1039595169607:web:650f75ac9edcc04cf28e62",
  measurementId: "G-QE3L0T5Z7P",
};

firebase.initializeApp(firebaseConfig);
const storage = getStorage();

var server = net_server.createServer(function (client) {
  console.log('Client connection: ');
  console.log('local = %s:%s', client.localAddress, client.localPort);
  console.log('remote = %s:%s', client.remoteAddress, client.remotePort);
  client.setTimeout(500);
  client.setEncoding('utf8');
  sockets.push(client);
  var imageData = "";

  client.on('data', function (data) {
    imageData += data;
  });

  client.on('end', function () {
    console.log('end!')
    var decoded = Buffer.from(imageData, 'base64');
    var imageFile = fs.writeFile("test.jpg", decoded, function (err) {
      if (err) throw err;
      else {
        console.log('Saved!');
        putImageInDb(imageFile)
      }
    });
  });

  client.on('error', function (err) {
    console.log('Socket Error: ', JSON.stringify(err));
  });

  client.on('timeout', function () {
    console.log('Socket Timed out');
  });
});

server.listen(3008, function () {
  console.log('Server listening: ' + JSON.stringify(server.address()));

  server.on('close', function () {
    console.log('Server Terminated');
  });

  server.on('error', function (err) {
    console.log('Server Error: ', JSON.stringify(err));
  });
});


const putImageInDb = async (file) => {
  const storageRef = ref(storage, `image.jpg`);
  //RIGHT NOW FILE IS NOTHING
  //make sure to have something sent into this function, and replace the file variable
  await uploadBytes(storageRef, file);
};
