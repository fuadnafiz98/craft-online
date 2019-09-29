
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDIjUPS6jhr6gLoGN7fMpBSURclVKvbRjA",
    authDomain: "craftonline-b7236.firebaseapp.com",
    databaseURL: "https://craftonline-b7236.firebaseio.com",
    projectId: "craftonline-b7236",
    storageBucket: "",
    messagingSenderId: "365512980588",
    appId: "1:365512980588:web:c326978fb4d1f285558049"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
