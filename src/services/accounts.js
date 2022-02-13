import { getFirestore, collection, addDoc, Timestamp, getDoc, doc, getDocs, } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from './firebase';

const db = getFirestore(firebase);
const auth = getAuth(firebase);

export function createAccount(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {
                ...data,
                userid: auth.currentUser.uid,
                createdDate: Timestamp.now().seconds
            }
            const docRef = await addDoc(collection(db, "accounts"), payload)
            const docID = docRef.id

            resolve(docID)

        } catch (error) {

            reject(error)
        }
    })
}

export async function getAccounts() {
    return new Promise(async (resolve, reject) => {
        try {
            var payload = []
            const querySnapshot = await getDocs(collection(db, "accounts"));

            if (querySnapshot.empty) resolve(null)


            querySnapshot.forEach((doc) => {
                payload.push({ id: doc.id, ...doc.data(), })
            });

            resolve(payload)

        } catch (error) {
            
            reject(error)

        }
    })
}

export async function delAccount(id) {
    return new Promise(async (resolve, reject) => {
        try {
            var payload = []
            const querySnapshot = await getDocs(collection(db, "accounts"));

            if (querySnapshot.empty) resolve(null)

            querySnapshot.forEach((doc) => {
                payload.push({ id: doc.id, ...doc.data(), })
            });

            resolve(payload)

        } catch (error) {

            reject(error)

        }
    })
}
