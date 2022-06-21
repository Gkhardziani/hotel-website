const firebaseConfig = {
    apiKey: "AIzaSyBwZoNT-v5AZfgJSpPxYtOrlWqqR6IVYv8",
    authDomain: "first-project-91146.firebaseapp.com",
    databaseURL: "https://first-project-91146-default-rtdb.firebaseio.com",
    projectId: "first-project-91146",
    storageBucket: "first-project-91146.appspot.com",
    messagingSenderId: "312752782813",
    appId: "1:312752782813:web:34736c353111a1546a8a34",
    measurementId: "G-JLM4RFYS19"
};


firebase.initializeApp(firebaseConfig);


function randomID() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
        let r = (Math.random() * 16) | 0;
        let v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}


function generateFirebaseItem(ID, value) {
    return {
        userid: ID,
        data: value,
    };
}


function addElementInFirebase(REF, data) {
    firebase
        .database()
        .ref(REF + randomID())
        .set(data);
}


function getArrayFromFirebase(REF) {
    let tempArray = [];
    firebase
        .database()
        .ref(REF)
        .on("value", (response) => {
            response.forEach((element) => {
                tempArray.push(generateFirebaseItem(element.key, element.val()));
            });
        });
    return tempArray;
}


function removeRefFromFirebase(REF) {
    firebase.database().ref(`${REF}`).remove();
}


function removeElementFromFirebase(REF, id) {
    firebase.database().ref(`${REF}/${id}`).remove();
}


function getElementFromFirebaseByID(REF, id) {
    const tempArray = getArrayFromFirebase(REF);
    let temp = {};
    tempArray.forEach((element) => {
        if (element.userid === id) {
            temp = element;
        }
    });
    console.log(temp);
    return temp;
}


function changeDataOnFirebaseByID(REF, ID, data) {
    firebase
        .database()
        .ref(REF + "/" + ID)
        .set(data);
}
