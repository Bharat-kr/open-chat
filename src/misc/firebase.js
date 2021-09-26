import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';
import { getMessaging} from "firebase/messaging";

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
export const storage = app.storage();

// export const messaging =firebase.messaging.isSupported() ? app.messaging() : null;
export const messaging = getMessaging();
// if (messaging) {
//     messaging.usePublicVapidKey(
//         'BN7nKV3QbT9ak6b8sjrIcCHvK2JzJXBEJv33QAuAPOdAVCfnVt4M6DG5KLQafjne8ajDrHQuKQwLqbzTQEnJ7sI'
//     );

//     messaging.onMessage(data => {
//         console.log(data);
//     });
// }
