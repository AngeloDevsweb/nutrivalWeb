import firebase from 'firebase/app'
import 'firebase/firestore'

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD-h0TGJ2KsGXiPyHGtZExWMJzfb-SyhJ0",
    authDomain: "nutrival-92878.firebaseapp.com",
    projectId: "nutrival-92878",
    storageBucket: "nutrival-92878.appspot.com",
    messagingSenderId: "436127861856",
    appId: "1:436127861856:web:725218b2f8171f1adc4705"
  };
  // Initialize Firebase
  const fb = firebase.initializeApp(firebaseConfig);
export const db = fb.firestore();