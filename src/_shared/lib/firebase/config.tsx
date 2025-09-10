// Import the functions you need from the SDKs you need
import envConfig from '@/_shared/models/environment-config.model'
import { FirebaseApp, getApps, initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: envConfig.FIREBASE_API_KEY,
  authDomain: envConfig.FIREBASE_AUTH_DOMAIN,
  projectId: envConfig.FIREBASE_PROJECT_ID,
  storageBucket: envConfig.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: envConfig.FIREBASE_SENDER_ID,
  appId: envConfig.FIREBASE_APP_ID,
}

// Initialize Firebase only if we have valid configuration
let firebase_app: FirebaseApp | null = null
let db: Firestore | null = null

if (typeof window !== 'undefined' && envConfig.FIREBASE_API_KEY) {
  try {
    firebase_app =
      getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
    db = getFirestore(firebase_app)
  } catch (error) {
    console.warn('Firebase initialization failed:', error)
  }
}

export default firebase_app

export { db }
