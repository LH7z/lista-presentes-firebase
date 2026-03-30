import firebase from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js";
import "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js";


const firebaseConfig = {
  apiKey: "AIzaSyC63E0_3Hf_vy5LQou1B9NwXAJFum_zYUM",
  authDomain: "lista-de-presente-da-su.firebaseapp.com",
  projectId: "lista-de-presente-da-su",
  storageBucket: "lista-de-presente-da-su.firebasestorage.app",
  messagingSenderId: "647879876295",
  appId: "1:647879876295:web:04d1ca400500b3170728e2",
  measurementId: "G-G8SQBKV969"
};


firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

console.log("🔥 Firestore conectado com sucesso!");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


console.log("Firebase initialized.", db);

async function loadGifts() {
  const querySnapshot = await getDocs(collection(db, "gifts"));
  const container = document.getElementById("gift");
  container.innerHTML = "";
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const giftElement = document.createElement("div");
    giftElement.classList.add("gift-item");
    giftElement.innerHTML = `
      <h3>${data.name}</h3>
      <button onclick="reserveGift('${doc.id}')">Reserve</button>
    `;
    container.appendChild(giftElement);
  });
}

window.reserveGift = async function(id) {
  const giftRef = doc(db, "gifts", id);
  await updateDoc(giftRef, {
    reserved: true
  });
  loadGifts();
}

loadGifts();

console.log("Firebase initialized and gifts loaded.");

