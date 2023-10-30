import { useEffect, useState } from "react"
import userPic from "../assets/user.png"
export default function AccountLoggedIn(){
    const [userName, setUserName] = useState("פלוני אלמוני")
    useEffect(()=>{
        //fetch user name from server?

    }, [])
    return (
        <button style={{display:"flex", flexDirection: "row",alignSelf:"flex-end", justifyContent:"center", alignItems:"center", direction:"rtl", marginTop:"10px"}}>
            <img width="36px" height="36px" src={userPic.src}></img>
            <text style={{direction:"rtl", padding:"10px"}}>{userName}</text>
        </button>
    )
}