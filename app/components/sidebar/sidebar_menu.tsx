import { useEffect, useState } from "react";
import SideBarItem from "./sidebar_item";
import menuIcon from "../../assets/menu.png";
export default function SideBarMenu() {
  const [isOpen, setOpen] = useState(false);
  return (
    <div
      style={{
        position: "fixed",
        right: 0,
        top: 0,
        height: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        transform: isOpen
          ? "translate3d(0vw, 0, 0)"
          : "translate3d(20vw, 0, 0)",
        transition: "transform 0.4s",
      }}
    >
      <button onClick={() => setOpen(!isOpen)}>
        <img
          src={menuIcon.src}
          width="48px"
          height="48px"
          style={{
             margin: "10px",
             transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
             transition: "transform 0.6s"
            }}
        ></img>
      </button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "top",
          alignItems: "center",
          width: "20vw",
          height: "100%",
          backgroundColor: "whitesmoke"
        }}
      >
        <SideBarItem text = "עריכת משמרות"/>
        <SideBarItem text = "צפייה במשמרות" />
        <SideBarItem text = "התנתקות" />
      </div>
    </div>
  );
}
