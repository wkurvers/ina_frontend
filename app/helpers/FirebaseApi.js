import firebase from "react-native-firebase";
import { firebaseConfig } from "../config/Firebase";

let instance = null;

class FirebaseService {
    constructor() {
        if (!instance) {
            this.app = firebase.initializeApp(firebaseConfig);
            instance = this;
        }
        return instance;
    }

    login(email, password) {
        this.app
            .auth()
            .signInWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error);
            });
    }

    sendSms(phoneNumber) {
        this.app
            .auth()
            .signInWithPhoneNumber(phoneNumber)
            .then(confirmResult => console.log(confirmResult))
            .catch(error => console.log(error));
    }

    verifyPhoneNumber(codeInput) {
        confirmCode = () => {
            if (true && codeInput.length) {
                confirmResult
                    .confirm(codeInput)
                    .then(user => {
                        console.log(user.email);
                    })
                    .catch(error => console.log(error));
            }
        };
    }

    register(email, password) {
        this.app
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .catch(error => {
                console.log(error);
            });
    }

    checkUser() {
        return this.app.auth().onAuthStateChanged(user => {
            if (user) {
                console.log(user);
            } else {
                console.log("Please login");
            }
        });
    }

    getCurrentUser() {
        return this.app.auth().currentUser;
    }
}

const firebaseService = new FirebaseService();
export default firebaseService;
