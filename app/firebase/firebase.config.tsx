import { getApp, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

 // Initialize Firebase
 const config = {
  apiKey:"AIzaSyA27poPjvxGuZVDJOkMeCm-HTEIcjVXQAM",
  authDomain:"shifterscheduler.firebaseapp.com",
  projectId:"shifterscheduler",
  storageBucket:"shifterscheduler.appspot.com",
  messagingSenderId:"624891159726",
  appId:"1:624891159726:web:c38b4c85d5f9939a11793f",
  measurementId:"G-J0EMVZT9ES"
}
 const app = initializeApp(config)
 console.log("firebase.config, initalized: " + app.name)
    // const analytics = getAnalytics(app)
  export const db = getFirestore(app)