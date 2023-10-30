'use client'
import DaySelector from "./day_selector"
import { useEffect, useState } from "react"
export default function DayContainer(props:any){
    const [selection, setSelection] = useState(props.data)
    const [mobile, setMobile] = useState(window.innerWidth <= 500)
    useEffect(()=>{
        window.addEventListener('resize', ()=>setMobile(window.innerWidth <= 500))
        return ()=>window.removeEventListener('resize', ()=>setMobile(window.innerWidth <= 500))
    },[])
    useEffect(()=>{
        setSelection(props.data)
    },[props.data])
    const callBackSelection = (selectionData:any)=>{
        setSelection(selectionData)
        props.callBackData(selectionData, props.day, props.isUpdateFromProps)
        
    }
    const days = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"]
    const daysHebrew = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי","שבת"]
    return(
        <div style={{display: "flex", flexDirection:(mobile ? "row" :"column"), justifyContent:"center", alignItems:"center"}}>
            <div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
                <h2>{daysHebrew[props.day - 1]}</h2>
                <h2>{props.date}</h2>  
            </div>
            
            <DaySelector day = {props.day} selection = {selection} callBackData = {callBackSelection}/>
        </div>
    )
    
}