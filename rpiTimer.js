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
const gpio = require('onoff').Gpio

const lightPins = {
    up: {
        red: new gpio(9, 'out'),
        yellow: new gpio(10, 'out'),
        green: new gpio(11, 'out'),
    },
    right: {
        red: new gpio(16, 'out'),
        yellow: new gpio(20, 'out'),
        green: new gpio(21, 'out'),
    },
    down: {
        red: new gpio(14, 'out'),
        yellow: new gpio(15, 'out'),
        green: new gpio(18, 'out'),
    },
    left: {
        red: new gpio(1, 'out'),
        yellow: new gpio(7, 'out'),
        green: new gpio(8, 'out'),
    }
}

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

const sleep = (howLong) => {
    return new Promise((resolve) => {
        setTimeout(resolve, howLong)
    })
}

const setupLights = async () => {
    flag = 0;
    const red = new gpio(9, 'out')
    const yellow = new gpio(10, 'out')
    const green = new gpio(11, 'out')
    const red1 = new gpio(16, 'out')
    const yellow1 = new gpio(20, 'out')
    const green1 = new gpio(21, 'out')
    const red2 = new gpio(14, 'out')
    const yellow2 = new gpio(15, 'out')
    const green2 = new gpio(18, 'out')
    const red3 = new gpio(1, 'out')
    const yellow3 = new gpio(7, 'out')
    const green3 = new gpio(8, 'out')
    for (const light in lightPins) {
        if (flag === 0) {
            red.writeSync(1)
        }
        else if (flag === 1) {
            red1.writeSync(1)
        }
        else if (flag === 2) {
            red2.writeSync(1)
        }
        else {
            red3.writeSync(1)
        }
        flag++;
    }
}

const runLights = async () => {
    while (true) {
        let intervals = []
        get(ref(database)).then((snapshot) => {
            let databaseValues = snapshot.val()
            intervals = [
                databaseValues.lightOneInterval,
                databaseValues.lightTwoInterval,
                databaseValues.lightThreeInterval,
                databaseValues.lightFourInterval
            ]
        });
        flag = 0;
        const red = new gpio(9, 'out')
        const yellow = new gpio(10, 'out')
        const green = new gpio(11, 'out')
        const red1 = new gpio(16, 'out')
        const yellow1 = new gpio(20, 'out')
        const green1 = new gpio(21, 'out')
        const red2 = new gpio(14, 'out')
        const yellow2 = new gpio(15, 'out')
        const green2 = new gpio(18, 'out')
        const red3 = new gpio(1, 'out')
        const yellow3 = new gpio(7, 'out')
        const green3 = new gpio(8, 'out')
        for (const light in lightPins) {
            if (flag === 0) {
                red.writeSync(0)
                green.writeSync(1)
                await sleep(intervals[flag] * 1000)
                green.writeSync(0)
                yellow.writeSync(1)
                await sleep(1000)
                yellow.writeSync(0)
                red.writeSync(1)
            }
            else if (flag === 1) {
                red1.writeSync(0)
                green1.writeSync(1)
                await sleep(intervals[flag] * 1000)
                green1.writeSync(0)
                yellow1.writeSync(1)
                await sleep(1000)
                yellow1.writeSync(0)
                red1.writeSync(1)
            }
            else if (flag === 2) {
                red2.writeSync(0)
                green2.writeSync(1)
                await sleep(intervals[flag] * 1000)
                green2.writeSync(0)
                yellow2.writeSync(1)
                await sleep(1000)
                yellow2.writeSync(0)
                red2.writeSync(1)
            }
            else {
                red3.writeSync(0)
                green3.writeSync(1)
                await sleep(intervals[flag] * 1000)
                green3.writeSync(0)
                yellow3.writeSync(1)
                await sleep(1000)
                yellow3.writeSync(0)
                red3.writeSync(1)
            }
            // light.red.writeSync(0)
            // light.green.writeSync(1)
            // await sleep(intervals[flag] * 1000)
            // light.green.writeSync(0)
            // light.yellow.writeSync(1)
            // await sleep(1000)
            // light.yellow.writeSync(0)
            // light.red.writeSync(1)

            flag++;
        }

    }
}

const allLightsOff = () => {
    red.writeSync(0)
    yellow.writeSync(0)
    green.writeSync(0)
}

// Handle Ctrl+C exit cleanly 
process.on('SIGINT', () => {
    allLightsOff()
    process.exit()
})

setupLights()
runLights()