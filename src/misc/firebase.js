import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database'

const config = {
  apiKey: 'AIzaSyBCzPyaKnWAI652UKNTt29mwTTqbCWQzVw',
  authDomain: 'open-chat-fe011.firebaseapp.com',
  projectId: 'open-chat-fe011',
  storageBucket: 'open-chat-fe011.appspot.com',
  messagingSenderId: '322661198746',
  appId: '1:322661198746:web:61c98b63be5988534a6823',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();