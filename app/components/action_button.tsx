'use client'
import styles from "./action_button.module.css"
export default function ActionButton(props:any){
    const clickAction = ()=>{
        if(props.isActive){
            props.callBackSave()
        }
        
    }
    return(
        <button className={props.isActive? styles.confirm: styles.idle} onClick={()=>clickAction()}>
        <text>{props.text}</text>
        </button>
    )
}
