import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDEvrBD5kO_m2pAJt5-ORkSEqIFFZlPKy8',
  authDomain: 'vue-music-app-b26ae.firebaseapp.com',
  projectId: 'vue-music-app-b26ae',
  storageBucket: 'vue-music-app-b26ae.appspot.com',
  appId: '1:644027463417:web:b45ed53f0539b575be9428',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const usersCollection = db.collection('users');

export {
  auth,
  db,
  usersCollection,
};
