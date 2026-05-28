import admin from "firebase-admin";

console.log("FIREBASE ENV CHECK:");

console.log(
process.env.FIREBASE_SERVICE_ACCOUNT
? "ENV FOUND"
: "ENV MISSING"
);

const serviceAccount = JSON.parse(
process.env.FIREBASE_SERVICE_ACCOUNT
);

admin.initializeApp({
credential: admin.credential.cert(serviceAccount),
});

console.log("FIREBASE ADMIN INITIALIZED");

export default admin;