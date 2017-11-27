
import {AuthMethods, AuthProviders} from "angularfire2";


export const firebaseConfig = {
    // Paste all this from the Firebase console...
    apiKey: "AIzaSyDyZqJ5FTbnnBVFIJdAtSRQbfqRZ4r6AcQ",
    authDomain: "meet-285f0.firebaseapp.com",
    databaseURL: "https://meet-285f0.firebaseio.com",
    storageBucket: "meet-285f0.appspot.com",
    messagingSenderId: "318523374945"
};

export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
