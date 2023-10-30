import { useEffect, useState } from "react";
import logo from "../../assets/user.png"
export default function SideBarItem(props:any) {
  return (
    <button
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        direction:'rtl',
        margin:'10px'
      }}
    >
      <img
        src={logo.src}
        width="36px"
        height="36px"
        style={{marginLeft:"10px"}}
      ></img>
      <text style={{fontSize:"1.5rem", color:"black"}}>{props.text}</text>
    </button>
  );
}
