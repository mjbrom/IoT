var firebase = require("firebase/app");
const { getStorage, uploadBytes, ref } = require("firebase/storage");

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

const putImageInDb = async (file) => {
  const storageRef = ref(storage, `image.jpg`);
  //RIGHT NOW FILE IS NOTHING
  //make sure to have something sent into this function, and replace the file variable
  await uploadBytes(storageRef, file);
};
