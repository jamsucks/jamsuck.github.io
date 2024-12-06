// Импорт необходимых функций из SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Конфигурация вашего веб-приложения Firebase
const firebaseConfig = {
    apiKey: "AIzaSyD-GR3LpUVibWcu4BeHwyMnunnaBucF44A",
    authDomain: "strawberry-counter.firebaseapp.com",
    projectId: "strawberry-counter",
    storageBucket: "strawberry-counter.appspot.com",
    messagingSenderId: "465708506571",
    appId: "1:465708506571:web:4949b8bd57824958cf2a4e"
};

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Переменная для хранения количества кликов
let count = 0;

// Функция для обновления счетчика в Firestore
async function updateCount() {
    try {
        await setDoc(doc(db, "clicks", "counter"), { count: count });
        console.log("Счетчик обновлен в Firestore");
    } catch (error) {
        console.error("Ошибка обновления счетчика: ", error);
    }
}

// Функция для получения текущего значения счетчика из Firestore
async function getCount() {
    const docRef = doc(db, "clicks", "counter");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        count = docSnap.data().count;
        document.getElementById("clickCount").textContent = count;
    } else {
        console.log("Документ не найден, создаем новый");
        updateCount();
    }
}

// Получаем текущее значение счетчика при загрузке
getCount();

// Обработчик клика по кнопке
document.getElementById("clickButton").addEventListener("click", function() {
    count++;
    document.getElementById("clickCount").textContent = count;
    updateCount();
});
