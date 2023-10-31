"use client";
import appIcon from "../assets/medical_team.png";
import googleWebIcon from "../assets/web_google_signIn.png";
import landPageWallpaper from "../assets/wallpaper_landpage.png";
import { signInWithGoogle } from "../firebase/authWithGoogle";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import styles from "./page.module.css";
export default function () {
    const router = useRouter()
    useEffect(()=>{
        const auth = getAuth(app)
        console.log('auth = ',auth.currentUser)
        onAuthStateChanged(auth, ()=>{
            if (auth.currentUser){
                console.log("redirecting logged in user")
                router.push("/weekly_scheduele")
                
            }
        })
        
    },[])
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        backgroundImage: "url(" + landPageWallpaper.src + ")",
      }}
    >
      <div className={styles.maindiv}>
        <img src={appIcon.src} width="96px" height="96px" />
        <h1 className={styles.title}>Shifter</h1>
        <h2 className={styles.subtitle}>Manage your nursing time</h2>
        <button onClick={signInWithGoogle} style={{ marginTop: "5%" }}>
          <img src={googleWebIcon.src} width="175px" />
        </button>
      </div>
    </div>
  );
}
