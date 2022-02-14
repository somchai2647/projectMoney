import { getFirestore, collection, addDoc, Timestamp, getDoc, doc, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import firebase from './firebase';

const db = getFirestore(firebase)
const auth = getAuth(firebase)

export function addCategory(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = { ...data, delstatus: false, createdDate: Timestamp.now().seconds }
            const docRef = await addDoc(collection(db, "categorys"), payload)
            const docID = docRef.id

            resolve(docID)

        } catch (error) {
            reject(error)
        }
    })
}

export function getCategory(accountID) {
    return new Promise(async (resolve, reject) => {
        try {
            var payload = []
            const querySnapshot = await getDocs(query(collection(db, "categorys"), where("account", "==", accountID), where("delstatus", "==", false)))

            if (querySnapshot.empty) resolve(null)

            querySnapshot.forEach((doc) => {
                payload.push({ id: doc.id, ...doc.data() })
            })

            resolve(payload)

        } catch (error) {
            reject(error)
        }
    })
}