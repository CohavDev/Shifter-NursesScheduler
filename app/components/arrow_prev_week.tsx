'use client'
export default function ArrowPrevWeek(props:any){
    return(
        <button style={styles.next} onClick={()=>props.callBack(props.value)}>
            <text>שבוע קודם</text>
        </button>
    )
}
const styles = {
    next:{
        width:"90px",
        height:"45px",
        color:"gray"
    }
}
