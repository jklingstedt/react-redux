import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyCH8t4F4BoWbXKxZfmyZ88zcFvWDJNjg5o',
  authDomain: 'react-redux-46791.firebaseapp.com',
  databaseURL: 'https://react-redux-46791.firebaseio.com',
  storageBucket: 'react-redux-46791.appspot.com',
  messagingSenderId: '37301774234',
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersDucksExpirationLength = 100000
export const userExpirationLength = 100000
export const repliesExpirationLength = 300000
