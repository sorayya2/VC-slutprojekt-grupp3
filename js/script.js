// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove, push,update } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-database.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    databaseURL: 'https://vc-slutprojekt-grupp4-default-rtdb.europe-west1.firebasedatabase.app/',
    apiKey: "AIzaSyD1l-NXN8r-Cvi1XrFO3oEgtDhwGfeaDvE",
    authDomain: "vc-slutprojekt-grupp4.firebaseapp.com",
    projectId: "vc-slutprojekt-grupp4",
    storageBucket: "vc-slutprojekt-grupp4.appspot.com",
    messagingSenderId: "559571095134",
    appId: "1:559571095134:web:0e5635665f81596885eecf"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

console.log(db);


// Detect if user is new or not
let userId = 0;

const isNew = localStorage.getItem('userId') == null;
if(isNew){
    localStorage.setItem('userId', userId);
    //New user 
    userId++;
    console.log(localStorage.getItem('userId'));
} else{
    console.log(localStorage.getItem('userId'));
    //User is not new
}

// Write data
function writeUserData() {
    set(ref(db, 'Eddie'), {
        message: `This is a message from User:`
    });
}

writeUserData();


// Read data (only once)
onValue(ref(db, 'Eddie'), (snapshot) => {
    const data = snapshot.val();
    // alert(data.message);
}, { onlyOnce: true }
);


var id = push(ref(db, 'User'),  {
    test:456
})
update(ref(db, 'User'), {
    id: id.key
});
remove(ref(db, 'User/'+ id.key)).then(() => {
    console.log('generated info removed');
});

//Remove shit
remove(ref(db, 'Henrik')).then(() => {
    console.log('Henrik removed');
});


// här börjar kod som inte är firebase-igt

// input-message som sparas i databas
const messageBox = document.querySelector('#message-input');
const messageBtn = document.querySelector('#message-btn');
messageBtn.addEventListener('click', createMessage);
const userMessage = messageBox.value;

function createMessage(event) {
    event.preventDefault();

    // Write data
    function writeUserData() {
        set(ref(db, 'User'), {
            message: `${userMessage}`
        });
    }

    writeUserData();

    messageBox.value = '';
}

// Loop through messages and display
onValue(ref(db, '/'), (snapshot) => {
    snapshot.forEach((childSnapshot) => {
        const childKey = childSnapshot.key;
        const childData = childSnapshot.val();
        console.log(childKey, childData);

        const messageDiv = document.querySelector('#messages');
        const messageForBoard = document.createElement('div');
        messageDiv.prepend(messageForBoard);
        const messageP = document.createElement('p');
        messageForBoard.appendChild(messageP);
        messageP.innerText = childData.message;
    });
}, {
    onlyOnce: true
});