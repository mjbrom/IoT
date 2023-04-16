import { initializeApp } from "firebase/app";
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
import { getStorage, uploadBytes, ref as sRef } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDW5f707W16ftUpvJ7h1n-M2GrM-hFzZZw",
  authDomain: "iot-project-678a0.firebaseapp.com",
  projectId: "iot-project-678a0",
  storageBucket: "iot-project-678a0.appspot.com",
  messagingSenderId: "1039595169607",
  appId: "1:1039595169607:web:650f75ac9edcc04cf28e62",
  measurementId: "G-QE3L0T5Z7P",
};

const firebase = initializeApp(firebaseConfig);
const database = getDatabase(firebase);
//creating a root reference
const storage = getStorage(firebase);

getImageFromPi = async (data) => {
  //fill this in when we know more about how we'll be receiving an image
};

putImageInDb = async (image) => {
  const storageRef = sRef(storage, `image.jpg`);
  await uploadBytes(storageRef, file);
  console.log("uploaded image");
};

export { database, firebase, storage };
