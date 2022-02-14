import { getFirestore, collection, addDoc, Timestamp, getDoc, doc, getDocs, } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from './firebase';

const db = getFirestore(firebase)
const auth = getAuth(firebase)

export function addRecord(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = {}
            const docRef = await addDoc(collection(db, "records"), payload)
            const docID = docRef.id

            resolve(docID)

        } catch (error) {
            reject(error)
        }
    })
}

export function getRecord(accountID) {
    return new Promise(async (resolve, reject) => {
        try {
            var payload = []
            const querySnapshot = await getDocs(collection(db, "records"))

            if (querySnapshot.empty) resolve(null)

            querySnapshot.forEach((doc) => {
                payload.push({ id: doc.id, ...doc.data() })
            })

            resolve(payload)

        } catch (error) {

        }
    })
}