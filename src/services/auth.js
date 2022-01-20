import firebase from './firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth(firebase);

export const create = (email, password, password2) => {
    return new Promise(async (resolve, reject) => {

        if (password !== password2) return reject("รหัสผ่านไม่ตรงกัน")

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            if (userCredential) resolve(userCredential.user)

        } catch (err) {

            return reject(err)
        }
    })

};

export const login = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)

            if (userCredential) return resolve(userCredential.user)

        } catch (err) {

            return  reject("อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        }
    })
}