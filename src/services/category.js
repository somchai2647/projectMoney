import { getFirestore, collection, addDoc, Timestamp, getDocs, query, where, orderBy, getDoc, doc } from "firebase/firestore";
import firebase from './firebase';

const db = getFirestore(firebase)

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

export function getOne(categoryID) {
    return new Promise(async (resolve, reject) => {
        try {
            const querySnapshot = await getDoc(doc(db, "categorys", categoryID))

            if (querySnapshot.exists()) resolve(querySnapshot.data())

            resolve(null)

        } catch (error) {
            reject(error)
        }
    })
}


export function getCategory(accountID) {
    return new Promise(async (resolve, reject) => {
        try {
            var payload = []

            const querySnapshot = await getDocs(query(collection(db, "categorys"), where("account", "==", accountID), orderBy("createdDate", "desc")))

            querySnapshot.forEach((doc) => {
                payload.push({ id: doc.id, ...doc.data() })
            })

            resolve(payload)

        } catch (error) {

            reject(error)
            
        }
    })
}