import * as Admin from "firebase-admin";

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID as string;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL as string;
const privateKey = process.env.FIREBASE_PRIVATE_KEY as string;

if (!Admin.apps.length) {
    Admin.initializeApp({
        credential: Admin.credential.cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
    });
}

export default Admin;
