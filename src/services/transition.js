import { getFirestore, collection, addDoc, Timestamp, limit, getDocs, query, where, orderBy } from "firebase/firestore";
import firebase from './firebase';

const db = getFirestore(firebase)

export function addTransition(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const payload = { ...data, delstatus: false, createdDate: Timestamp.now().seconds }
            const docRef = await addDoc(collection(db, "transitions"), payload)
            const docID = docRef.id

            resolve(docID)

        } catch (error) {
            reject(error)
        }
    })
}

export function getTransition(accountID, limitmode = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            var payload = []
            const querySnapshot = await getDocs(!limitmode > 0 ?
                query(collection(db, "transitions"), where("account", "==", accountID), orderBy("createdDate", "desc"))
                :
                query(collection(db, "transitions"), where("account", "==", accountID), orderBy("createdDate", "desc"), limit(limitmode))
            )

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

export function getBalance(data = []) {
    let balance = 0
    if (data) {
        data.map((item) => {
            const type = item.type
            if (type === "IN") {
                balance += item.money
            } else {
                balance -= item.money
            }
        })
    }
    return balance
}

export function getIncomeOutcome(data = []) {
    let income = 0
    let outcome = 0
    if (data) {
        data.map((item) => {
            if (item.type === "IN") {
                income += item.money
            } else {
                outcome += item.money
            }
        })
    }
    return { income, outcome }
}