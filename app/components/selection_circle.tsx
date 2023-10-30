'use client'
import { useEffect, useState } from "react"
import styles from "./selection_circle.module.css"
export default function SelectionCircle(props:any){
    const [isSelected, setSelected] = useState(props.selection);
    useEffect(()=>{
        setSelected(props.selection)
    }, [props.selection])
    return(
        <button className={!isSelected ? styles.primary : styles.selected} onClick={()=>
            {onClickSelection(props, !isSelected); setSelected(!isSelected)}}>
        <text>{props.text}</text>
        </button>
    )
}
const onClickSelection = (props:any, isSelected:boolean)=>{
    if(isSelected){
        props.callBack(props.id, 1)
        return
    }
    props.callBack(props.id, 0)
}
