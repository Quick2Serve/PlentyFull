import firebase from 'firebase';

// Initialize Firebase
// TODO: Replace with your project's customized code snippet
var config = {
  apiKey: "AIzaSyDc6_R4c7_8MUoAKM7h6ORalBgMoX5q32M",
  authDomain: "quick2serve-f191a.firebaseapp.com",
  databaseURL: "https://quick2serve-f191a.firebaseio.com/",
  storageBucket: "gs://quick2serve-f191a.appspot.com",
};

firebase.initializeApp(config);

var db = firebase.database()

export function getTestOrganization() {
    var organizations;
    db.ref('/Organizations/Test Org').once('value').then(function(snapshot) {
      organizations = snapshot;
    });
    return organizations;
};

