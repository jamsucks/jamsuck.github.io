import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

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

let count = 0;

const updateCount = async () => {
    try {
        await setDoc(doc(db, "clicks", "counter"), { count });
        console.log("Счетчик обновлен в Firestore");
    } catch (error) {
        console.error("Ошибка обновления счетчика: ", error);
    }
};

const getCount = async () => {
    const docSnap = await getDoc(doc(db, "clicks", "counter"));
    
    if (docSnap.exists()) {
        count = docSnap.data().count;
        document.getElementById("clickCount").textContent = count;
    } else {
        console.log("Документ не найден, создаем новый");
        updateCount();
    }
};

getCount();

document.getElementById("clickButton").addEventListener("click", () => {
    document.getElementById("clickCount").textContent = ++count;
    updateCount();
});
