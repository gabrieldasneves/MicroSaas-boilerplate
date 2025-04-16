import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
// import { getStorage } from "firebase-admin/storage";
import "server-only";

if (!process.env.FIREBASE_PRIVATE_KEY) {
  throw new Error("FIREBASE_PRIVATE_KEY is not set");
}

// Fix the private key format by replacing escaped newlines with actual newlines
const privateKey = process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n");

export const firebaseCert = cert({
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: privateKey,
});

if (!getApps().length) {
  initializeApp({
    credential: firebaseCert,
    //   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export const db = getFirestore();
// export const storage = getStorage().bucket();
