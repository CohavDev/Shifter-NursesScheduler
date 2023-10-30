'use client'
import { useState, useEffect } from "react"
import SelectionCircle from "./selection_circle";
import styles from "./day_selector.module.css"

export default function DaySelector(props:any){
    const [selection, setSelection] = useState(props.selection);
    const [mobile, setMobile] = useState(window.innerWidth <= 500)
    useEffect(()=>{
        window.addEventListener('resize', ()=>setMobile(window.innerWidth <= 500))
        return ()=>window.removeEventListener('resize', ()=>setMobile(window.innerWidth <= 500))
    },[])
    const updateDaySelector = (id:number, isSelected:number)=>{
        var newSelection = selection
        newSelection[id] = isSelected
        // console.log(newSelection)
        setSelection(newSelection)
        props.callBackData(newSelection)
    }
    useEffect(()=>{
        setSelection(props.selection)
        if(props.selection == null){
            setSelection([0,0,0])
        }
    },[props.selection])
    return(
        <div className={styles.primary} style={{flexDirection:(mobile ? "row" :"column")}}>
            <SelectionCircle id = {0} text = "בוקר" callBack = {updateDaySelector} selection = {selection[0]}  />
            <SelectionCircle id = {1} text = "ערב" callBack = {updateDaySelector} selection = {selection[1]} />
            <SelectionCircle id = {2} text = "לילה" callBack = {updateDaySelector} selection = {selection[2]} />
        </div>
    )
    
}