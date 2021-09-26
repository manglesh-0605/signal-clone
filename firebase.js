import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC46S5_ejt0TgxI_8U1Uz8W501N4stTI54",
    authDomain: "signal-clone-6040d.firebaseapp.com",
    projectId: "signal-clone-6040d",
    storageBucket: "signal-clone-6040d.appspot.com",
    messagingSenderId: "759922019527",
    appId: "1:759922019527:web:5544dee691f7127d0dc2e2",
    measurementId: "G-SRHVLNSE88"
};

let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app()
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth }