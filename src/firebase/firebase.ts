import * as admin from 'firebase-admin';


import { initializeApp } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = require("../../config/fbServiceAccountKey.json");

const app = initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const defaultAuth = getAuth(app);
