import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBqJ31bRZbKBgCy2Gh4-JMvHLICzSG_FkU",
    authDomain: "the-group-project.firebaseapp.com",
    databaseURL: "https://the-group-project-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "the-group-project",
    storageBucket: "the-group-project.appspot.com",
    messagingSenderId: "306297024108",
    appId: "1:306297024108:web:e10ce8d3d71058f5513249",
    measurementId: "G-4JSS8Q6FYP"
  };

let login = firebase.initializeApp(firebaseConfig);
  
  export const auth = firebase.auth();
  export const googleProvider = new firebase.auth.GoogleAuthProvider();
  
  export { login };