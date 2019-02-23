import firebase from 'firebase'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCtFgjACE6Uh0Rif3kKQeAgOPFSId7l6C4",
    authDomain: "online-gradebook.firebaseapp.com",
    databaseURL: "https://online-gradebook.firebaseio.com",
    projectId: "online-gradebook",
    storageBucket: "online-gradebook.appspot.com",
    messagingSenderId: "203156823821"
};
var database = firebase.initializeApp(config);
export default database