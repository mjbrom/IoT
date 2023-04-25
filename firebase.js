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
const { getStorage, getDownloadURL } = require("firebase/storage");
const { ref: sRef } = require("firebase/storage");
// var sadbed = require("./random.jpg");
// const { getImageInDb } = require("./storage");

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
//creating a root reference
// const storage = getStorage(firebase);

const getImageInDb = async () => {
  const storageRef = sRef(storage, `random.jpg`);
  getDownloadURL(storageRef).then((url) => {
    console.log(url);
  });
};

setInterval(function () {
  set(ref(database, "lightOneInterval"), 0.5);
  set(ref(database, "lightTwoInterval"), 0.5);
  set(ref(database, "lightThreeInterval"), 0.5);
  set(ref(database, "lightFourInterval"), 0.5);
  set(ref(database, "numCarsOne"), 0.5);
  set(ref(database, "numCarsTwo"), 0.5);
  set(ref(database, "numCarsThree"), 0.5);
  set(ref(database, "numCarsFour"), 0.5);
  get(ref(database)).then((snapshot) => {
    console.log(snapshot.val().useEmergPath);
    if (snapshot.val().useEmergPath === true) {
      //do something, this already gets the new path as well
      //probably just set the path
    }
  });
  getImageInDb();
}, 3000);
