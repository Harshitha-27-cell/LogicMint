import { initializeApp } from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBArDuDmx19UyLfKFius3rDdHzDYumK2-Q",

  authDomain: "logicmint-faa09.firebaseapp.com",

  projectId: "logicmint-faa09",

  storageBucket: "logicmint-faa09.firebasestorage.app",

  messagingSenderId: "1078201735680",

  appId: "1:1078201735680:web:21c6ec8401d44590cc56e5"

};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider =
new GoogleAuthProvider();