import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
  apiKey: 'AIzaSyCfJWVtsApg_a4vphWxC6EWa8Fghueu7Bg',
  authDomain: 'references-dev.firebaseapp.com',
  databaseURL: 'https://references-dev.firebaseio.com',
  projectId: 'references-dev',
  storageBucket: 'references-dev.appspot.com',
  messagingSenderId: '459317893060'
}

firebase.initializeApp(config)
const auth = firebase.auth()
const database = firebase.database()
const storage = firebase.storage()
export { auth, database, storage }
