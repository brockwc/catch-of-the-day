import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC9txJeEAHEPw7oM1dUQL-wPVLU9sD9apw",
    authDomain: "catch-of-the-day-92b5e.firebaseapp.com",
    databaseURL: "https://catch-of-the-day-92b5e.firebaseio.com"
})

const base = Rebase.createClass(firebaseApp.database());

// This is a named export
export { firebaseApp }

// This is a default export
export default base;