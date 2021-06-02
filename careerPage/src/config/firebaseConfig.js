import firebase from 'firebase/app';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyA-0suo7-KzapacLRohKlTXzYqtN5IzkPE",
    authDomain: "hirep-aedfe.firebaseapp.com",
    projectId: "hirep-aedfe",
    storageBucket: "hirep-aedfe.appspot.com",
    messagingSenderId: "759238443856",
    appId: "1:759238443856:web:d51afc0a7806562804a255",
    measurementId: "G-6SJGLYM6Z0"
  };
  
  firebase.initializeApp(firebaseConfig);

  const storage = firebase.storage();

  export {
      storage, firebase as default
  }