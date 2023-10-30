import { useEffect, useState } from "react"
import DayContainer from "../components/day_container"
import DaySelector from "../components/day_selector"
import SelectionCircle from "../components/selection_circle"
import ArrowNextWeek from "./arrow_next_week"
import ArrowPrevWeek from "./arrow_prev_week"
import AccountLoggedIn from "./account_logged_in"
export default function WeeklyScheduele(props:any){
    
    const [firstDate, setFirstDate] = useState('')
    const [lastDate, setLastDate] = useState('')
    const [weeklyData, setData] = useState(props.weeklyData)
    const [isUpdateFromProps, setUpdate] = useState(true)
    const [mobile, setMobile] = useState(window.innerWidth <= 500)
    useEffect(()=>{
        window.addEventListener('resize', ()=>setMobile(window.innerWidth <= 500))
        setFirstDate(formatDate(props.firstDate))
        setLastDate(formatDate(props.endDate))
        return ()=>window.removeEventListener('resize', ()=>setMobile(window.innerWidth <= 500))
    },[])
    useEffect(()=>{
        setFirstDate(formatDate(props.firstDate))
        setLastDate(formatDate(props.endDate))
    }, [props.weekNumber, props.firstDate, props.lastDate])
    useEffect(()=>{
        console.log("props weekly data changed\n")
        setUpdate(true)
        setData(props.weeklyData)
    },[props.weeklyData])
    useEffect(()=>{
        console.log("weekly data changed; updated = \n",isUpdateFromProps)
        if(!isUpdateFromProps){
            console.log("props callback func called (updatefromprops = false)\n")
            props.setWeeklyData(weeklyData)
        }
    },[weeklyData])
    const callBackData = (dailyData:Array<number>, dayId:number, isUpdateFromProps:boolean) =>{
        console.log("callbackData, isUpdateFromProps =  ",isUpdateFromProps)
        setUpdate(false)
        const days = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"]
        var newData = {...weeklyData}
        var dayName = days[dayId-1].toLowerCase()
        newData[dayName] = dailyData
        setData(newData)
    }
    return (
        <div style={{display: "flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            {/* <AccountLoggedIn/> */}
            <h2 style={{fontSize:"1.5rem"}}>שבוע #{props.weekNumber} </h2>
            <div style={{display: "flex",flexDirection:"row", direction:"rtl"}}>
                <ArrowPrevWeek callBack = {props.changeWeekNumber} value = {props.weekNumber -1}/>
                <h2 style={{fontSize:"1.5rem", marginLeft:"15px", marginRight:"15px"}}>{firstDate} - {lastDate}</h2>
                <ArrowNextWeek callBack = {props.changeWeekNumber} value = {props.weekNumber +1}/>
            </div>
            <div style={{display:"flex",flexDirection:(mobile ? "column" :"row"), marginTop:"5%", direction:"rtl", opacity:(props.isLoading ? "0" : "1"), transition: "opacity 0.2s ease-in-out"}}>
            
                <DayContainer day = {1} date = {calcDayDate(props.firstDate, 1)} data = {weeklyData.sunday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
                <DayContainer day = {2} date = {calcDayDate(props.firstDate, 2)} data = {weeklyData.monday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
                <DayContainer day = {3} date = {calcDayDate(props.firstDate, 3)} data = {weeklyData.tuseday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
                <DayContainer day = {4} date = {calcDayDate(props.firstDate, 4)} data = {weeklyData.wednesday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
                <DayContainer day = {5} date = {calcDayDate(props.firstDate, 5)} data = {weeklyData.thursday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
                <DayContainer day = {6} date = {calcDayDate(props.firstDate, 6)} data = {weeklyData.friday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
                <DayContainer day = {7} date = {calcDayDate(props.firstDate, 7)} data = {weeklyData.saturday} callBackData = {callBackData} isUpdateFromProps = {isUpdateFromProps}/>
            </div>
        </div>
    )
}
const formatDate = (dayDate:Date)=>{
    var day =  dayDate.getDate().toString()
    var month = (1+dayDate.getMonth()).toString()
    if (dayDate.getDate() < 10){
        day = '0' + day
    }
    if (dayDate.getMonth() + 1 < 10){
        month = '0' + month
    }
    // console.log(day + '/' + month)
    return day + '/' + month
}
const calcDayDate = (startDate:Date, dayNumber:number)=>{
    const newTime = startDate.getTime() + (dayNumber -1)*86400000
    const newDate = new Date(newTime)
    return formatDate(newDate)
}