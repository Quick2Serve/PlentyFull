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

export const getTestOrganization = async () => {
    var organizations;
    try {
      await db.ref('/Organizations/-LF627SXzGMhDYYAgfJG').once('value').then(function(snapshot) {
        organizations = snapshot;
      });
    } catch(err) {
      console.log(err)
  }
    return organizations;
};

