import firebase from 'firebase/app';
import "firebase/auth";

export const auth = firebase.initializeApp({
        apiKey: "AIzaSyC4-zFc8_-9QDSRrK2qW-TywMqyzazk6h4",
        authDomain: "chat-app-3785a.firebaseapp.com",
        projectId: "chat-app-3785a",
        storageBucket: "chat-app-3785a.appspot.com",
        messagingSenderId: "881937451545",
        appId: "1:881937451545:web:04db434cd914203f8f3888"
}).auth();

