import { app } from '../firebase/firebase.config'
import { GoogleAuthProvider, signInWithRedirect, getAuth } from "firebase/auth";
var user;
export function signInWithGoogle(){
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);
    signInWithRedirect(auth, provider).then((result)=>{
        user = result
        // const user = result.user;
        console.log("signedin user = ",user)
    }).catch((error)=>{
        console.log("an error occured when signing in...\n")
    })
}
export function getUserAuthName(){
    const auth = getAuth(app)
    
}