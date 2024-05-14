import * as admin from 'firebase-admin';

import { initializeApp } from "firebase-admin/app";
import { getAuth } from 'firebase-admin/auth';
import * as fs from "fs";


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

// Read the JSON file
const rawdata: Buffer = fs.readFileSync('../../config/fbServiceAccountKey.json');
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


// Convert jsonData into a ServiceAccount object
// const serviceAccount = {
//   type: jsonData.type,
//   project_id: jsonData.project_id,
//   private_key_id: jsonData.private_key_id,
//   private_key: jsonData.private_key,
//   client_email: jsonData.client_email,
//   client_id: jsonData.client_id,
//   auth_uri: jsonData.auth_uri,
//   token_uri: jsonData.token_uri,
//   auth_provider_x509_cert_url: jsonData.auth_provider_x509_cert_url,
//   client_x509_cert_url: jsonData.client_x509_cert_url
// };
// const serviceAccount = require("../../config/fbServiceAccountKey.json");

const app = initializeApp({
  credential: admin.credential.cert(jsonData as admin.ServiceAccount),
});

export const defaultAuth = getAuth(app);
