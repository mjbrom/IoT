var firebase = require("firebase/app");
const {
  getDatabase,
  ref,
  onValue,
  set,
  update,
  get,
  push,
  child,
} = require("firebase/database");
const { getStorage, getDownloadURL, getBlob, getBytes } = require("firebase/storage");
const { ref: sRef } = require("firebase/storage");
const fs = require("fs")


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
const database = getDatabase();
const storage = getStorage();
// let databaseValues = {};
// let setInt = setInterval()
const getImageInDb = async () => {
  const storageRef = sRef(storage, `image.jpg`);
  getBytes(storageRef).then((snapshot) => {
    var imageBuffer = new Uint8Array(snapshot)
    fs.writeFile('./images/image.jpg', Buffer.from(imageBuffer), function (err) {
      if (err) {
        // fut.throw(err);
        console.log(err)
      } else {
        // fut.return(chunk.length);
        console.log("File created!")
      }
    });
  });

};

// onValue(ref(database, "emergExists"), (snapshot) => {
//   if (snapshot.val() === true) {
//     setInt = setInterval(function () {
//       set(ref(database, "emergExists"), false)
//     }, 10000)
//   }
// })

let rawData = fs.readFileSync("trafic_light_update.json")
let values = JSON.parse(rawData)
set(ref(database, "lightOneInterval"), parseFloat(values?.lightOneInterval));
set(ref(database, "lightTwoInterval"), parseFloat(values?.lightTwoInterval));
set(ref(database, "lightThreeInterval"), parseFloat(values?.lightThreeInterval));
set(ref(database, "lightFourInterval"), parseFloat(values?.lightFourInterval));
set(ref(database, "numCarsOne"), parseFloat(values?.numCarsOne));
set(ref(database, "numCarsTwo"), parseFloat(values?.numCarsTwo));
set(ref(database, "numCarsThree"), parseFloat(values?.numCarsThree));
set(ref(database, "numCarsFour"), parseFloat(values?.numCarsFour));

fs.watch("./trafic_light_update.json", (event, filename) => {
  if (filename) {
    let raw = fs.readFileSync("trafic_light_update.json")
    let dbValues = JSON.parse(raw)
    set(ref(database, "lightOneInterval"), parseFloat(dbValues?.lightOneInterval));
    set(ref(database, "lightTwoInterval"), parseFloat(dbValues?.lightTwoInterval));
    set(ref(database, "lightThreeInterval"), parseFloat(dbValues?.lightThreeInterval));
    set(ref(database, "lightFourInterval"), parseFloat(dbValues?.lightFourInterval));
    set(ref(database, "numCarsOne"), parseFloat(dbValues?.numCarsOne));
    set(ref(database, "numCarsTwo"), parseFloat(dbValues?.numCarsTwo));
    set(ref(database, "numCarsThree"), parseFloat(dbValues?.numCarsThree));
    set(ref(database, "numCarsFour"), parseFloat(dbValues?.numCarsFour));
  }
})

setInterval(function () {
  // let rawData = fs.readFileSync("trafic_light_update.json")
  // let values = JSON.parse(rawData)
  // set(ref(database, "lightOneInterval"), parseFloat(values?.lightOneInterval));
  // set(ref(database, "lightTwoInterval"), parseFloat(values?.lightTwoInterval));
  // set(ref(database, "lightThreeInterval"), parseFloat(values?.lightThreeInterval));
  // set(ref(database, "lightFourInterval"), parseFloat(values?.lightFourInterval));
  // set(ref(database, "numCarsOne"), parseFloat(values?.numCarsOne));
  // set(ref(database, "numCarsTwo"), parseFloat(values?.numCarsTwo));
  // set(ref(database, "numCarsThree"), parseFloat(values?.numCarsThree));
  // set(ref(database, "numCarsFour"), parseFloat(values?.numCarsFour));
  // get(ref(database)).then((snapshot) => {
  //   let databaseValues = snapshot.val()
  //   intervals = [
  //     databaseValues.lightOneInterval,
  //     databaseValues.lightTwoInterval,
  //     databaseValues.lightThreeInterval,
  //     databaseValues.lightFourInterval
  //   ]
  //   if (snapshot.val().useEmergPath === true) {
  //     //do something, this already gets the new path as well
  //     //probably just set the path
  //   }
  // });
  getImageInDb();
}, 10000);
