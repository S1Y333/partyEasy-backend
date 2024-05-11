import * as admin from 'firebase-admin';

import { initializeApp } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';

if (!process.env.FIREBASE_CONFIG) {
  throw new Error("FIREBASE_CONFIG environment variable is not defined.");
}

const serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const defaultAuth = getAuth(app);
