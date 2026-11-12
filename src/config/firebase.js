import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";



const firebaseConfig = {
  apiKey: "AIzaSyBGcqT_lh0XD6JVeS0j8WxE2X0BodSV17A",
  authDomain: "finearts-32f6b.firebaseapp.com",
  projectId: "finearts-32f6b",
  storageBucket: "finearts-32f6b.firebasestorage.app",
  messagingSenderId: "860244891245",
  appId: "1:860244891245:web:4cae27ad5baa4ed3a69164",
  measurementId: "G-9Q8BZ3BH6L"
};



const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("✅ Firebase persistence enabled");
  })
  .catch((error) => {
    console.log("❌ Persistence error:", error);
  });



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBGcqT_lh0XD6JVeS0j8WxE2X0BodSV17A",
//   authDomain: "finearts-32f6b.firebaseapp.com",
//   projectId: "finearts-32f6b",
//   storageBucket: "finearts-32f6b.firebasestorage.app",
//   messagingSenderId: "860244891245",
//   appId: "1:860244891245:web:4cae27ad5baa4ed3a69164",
//   measurementId: "G-9Q8BZ3BH6L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);