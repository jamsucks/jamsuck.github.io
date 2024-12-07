import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, runTransaction, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyD-GR3LpUVibWcu4BeHwyMnunnaBucF44A",
    authDomain: "strawberry-counter.firebaseapp.com",
    projectId: "strawberry-counter",
    storageBucket: "strawberry-counter.appspot.com",
    messagingSenderId: "465708506571",
    appId: "1:465708506571:web:4949b8bd57824958cf2a4e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const counterDocRef = doc(db, "clicks", "counter");
let displayedCount = 0;

const updateDisplayedCount = (count) => {
    displayedCount = count;
    document.getElementById("clickCount").textContent = displayedCount;
};

const refreshCount = async () => {
    try {
        const docSnap = await getDoc(counterDocRef);
        const currentCount = docSnap.exists() ? docSnap.data().count || 0 : 0;
        updateDisplayedCount(currentCount);
    } catch (error) {
        console.error(error);
    }
};

const registerClick = async () => {
    try {
        await runTransaction(db, async (transaction) => {
            const docSnap = await transaction.get(counterDocRef);
            const currentCount = docSnap.exists() ? docSnap.data().count || 0 : 0;
            transaction.update(counterDocRef, { count: currentCount + 1 });
        });
    } catch (error) {
        console.error(error);
    }
};

document.getElementById("clickButton").addEventListener("click", () => {
    updateDisplayedCount(displayedCount + 1);
    registerClick();
});

refreshCount();