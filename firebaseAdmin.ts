import admin from "firebase-admin";
import { getApps } from 'firebase-admin/app'

var serviceAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT as string);

if(!getApps().length){
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  })
}

const adminDB = admin.firestore()

export {
  adminDB
}
