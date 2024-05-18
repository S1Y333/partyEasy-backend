// import * as admin from 'firebase-admin';

// import { initializeApp } from "firebase-admin/app";
// import { getAuth } from 'firebase-admin/auth';

// const serviceAccount = require("../../config/fbServiceAccountKey.json");

// const app = initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// export const defaultAuth = getAuth(app);

import * as admin from "firebase-admin";

import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import * as fs from "fs";
import path from "path";


// Define the type for your JSON data
interface MyData {
  type: string;
  project_id: string;
  private_key_id: string;
  private_key: string;
  client_email: string;
  client_id: string;
  auth_uri: string;
  token_uri: string;
  auth_provider_x509_cert_url: string;
  client_x509_cert_url: string;
  universe_domain: string;
}
const filePath = path.resolve(__dirname, '../config/fbServiceAccountKey.json')
// Read the JSON file
const rawdata: Buffer = fs.readFileSync(filePath);
let jsonData: MyData = JSON.parse(rawdata.toString());

// Replace placeholders with environment variable values
jsonData = {
  ...jsonData,
  private_key_id:
    process.env.FIREBASE_CONFIG_PRIVATE_KEY_ID || jsonData.private_key_id,
  private_key: process.env.FIREBASE_CONFIG_PRIVATE_KEY || jsonData.private_key,
  client_email:
    process.env.FIREBASE_CONFIG_CLIENT_EMAIL || jsonData.client_email,
  client_id: process.env.FIREBASE_CONFIG_CLIENT_ID || jsonData.client_id,
  client_x509_cert_url:
    process.env.FIREBASE_CONFIG_CLIENT_X509_CERT_URL ||
    jsonData.client_x509_cert_url,
};


const app = initializeApp({
  credential: admin.credential.cert(jsonData as admin.ServiceAccount),
});

export const defaultAuth = getAuth(app);
