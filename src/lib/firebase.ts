
import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// These environment variables should be set in your .env.local file.
// Example .env.local:
// NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
// NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
// NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
// NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
// NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
// NEXT_PUBLIC_FIREBASE_APP_ID=1:your-app-id:web:your-app-id-web

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET;
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID;
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID;

if (!apiKey) {
  throw new Error(
    'Firebase API Key (NEXT_PUBLIC_FIREBASE_API_KEY) is missing. ' +
    'Please ensure you have a .env.local file in the project root ' +
    'with NEXT_PUBLIC_FIREBASE_API_KEY defined. ' +
    'You can find these values in your Firebase project settings. ' +
    'After adding/updating the .env.local file, you MUST restart your development server.'
  );
}
if (!authDomain) {
  // While the primary error is invalid-api-key, authDomain is also critical for initialization.
  console.warn(
    'Firebase Auth Domain (NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN) might be missing or incorrect. ' +
    'Please verify it in your .env.local file and Firebase project settings.'
  );
}
if (!projectId) {
  // ProjectId is also critical.
  console.warn(
    'Firebase Project ID (NEXT_PUBLIC_FIREBASE_PROJECT_ID) might be missing or incorrect. ' +
    'Please verify it in your .env.local file and Firebase project settings.'
  );
}


const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

let app: FirebaseApp;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth: Auth = getAuth(app);

export { app, auth };
