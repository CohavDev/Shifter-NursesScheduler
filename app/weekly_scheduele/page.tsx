'use client'
import { useEffect, useState } from "react";
import WeeklyScheduele from "../components/weekly_schedule";
import ActionButton from "../components/action_button";
import loadDataByWeek from "../firebase/loadDataFunctions";
import saveDataByWeek from "../firebase/saveDataFunctions";
import wallpaper from "../assets/Wallpaper.png"
import SideBarMenu from "../components/sidebar/sidebar_menu";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from '../firebase/firebase.config'
export default function(){
    const defaultData = {
        sunday:[0,0,0],
        monday:[0,0,0],
        tuseday:[0,0,0],
        wednesday:[0,0,0],
        thursday:[0,0,0],
        friday:[0,0,0],
        saturday:[0,0,0]
    }
    const [weekNumber, setWeekNumber] = useState(1)
    const [firstDay, setFirstDay] = useState(getFirstandLastDays(weekNumber)[0])
    const [lastDay, setLastDay] = useState(getFirstandLastDays(weekNumber)[1])
    const [data, setData] = useState(defaultData)
    const [isUpdated, setUpdated] = useState(true)
    const [isLoading, setLoading] = useState(false)
    const [userName, setUserName] = useState("")
    const callBackChangeWeekNumber = (newWeekNumber:number)=>{
        console.log("changing week number...(%d)",newWeekNumber)
        if(weekNumber <=0 || weekNumber >=53){
            return
        }
        //else
        setWeekNumber(newWeekNumber)
        const firstandLastDays = getFirstandLastDays(newWeekNumber)
        setFirstDay(firstandLastDays[0])
        setLastDay(firstandLastDays[1])
    }
    const callBackSetData = (data:any)=>{
        console.log("setting data: ",data)
        setData(data)
        setUpdated(false)
    }
    const callbackLoadData = (data:any)=>{
        console.log("After loadData - setting data: ",data)
        setData(data)
        setUpdated(true)
        setLoading(false)
    }
    const confirmSave = ()=>{
        setUpdated(true)
    }
    const callBackSaveDataToServer = ()=>{
        saveDataByWeek(weekNumber, data, confirmSave)
    }
    useEffect(()=>{
        const tempWeekNumber = getCurrentWeekNumber()
        setWeekNumber(tempWeekNumber)
        const firstandLastDays = getFirstandLastDays(tempWeekNumber)
        setFirstDay(firstandLastDays[0])
        setLastDay(firstandLastDays[1])
        const auth = getAuth(app)
        onAuthStateChanged(auth, (user)=>{
            if(user){
                console.log("\n\n\nuser = ",user.displayName)
                if(user.displayName){
                    setUserName(user.displayName)
                }
            }
        })

    },[])
    useEffect(()=>{
        if(weekNumber == 0){
            return
        }
        setLoading(true)
        loadDataByWeek(weekNumber, callbackLoadData)

    },[weekNumber])
    return (
        <div style = {{width:"100%", height:"100%", position:"fixed", backgroundImage:"url("+wallpaper.src+")", color:"white", fontFamily:""}}>
            <div style={
                {display: "flex", flexDirection:"column", justifyContent:"center", 
                alignItems:"center"}}>
                <SideBarMenu isLogged = {userName != ""}/>
                <WeeklyScheduele 
                    weekNumber = {weekNumber} firstDate = {firstDay} endDate = {lastDay} 
                    weeklyData = {data} setWeeklyData = {callBackSetData} 
                    changeWeekNumber={callBackChangeWeekNumber} isLoading = {isLoading}/>
                {/* <p dir="rtl">{isUpdated? "הכל מעודכן !" : "השינויים לא נשמרו" }</p> */}
                <ActionButton 
                    isActive = {!isUpdated} text = {isUpdated?"הכל מעודכן":"שמירת שינויים"} callBackSave = {callBackSaveDataToServer}/>
            </div>
        </div>
    )
}
const getCurrentWeekNumber = ()=>{
    const now = new Date()
    const startDate = new Date(now.getFullYear(), 0, 1)
    const days = Math.floor((now.getTime() - startDate.getTime()) / 86400000) // Calculate the number of days since January 1st
    return Math.ceil((days + 1) / 7) // Adding 1 to days to account for January 1st

}
const getFirstandLastDays = (weekNumber: number)=>{
    const y = (new Date()).getFullYear() // current year
    const oneDayMiliseconds = 24*60*60*1000
    const yearDate = new Date(y, 0, 1)
    const firstWeekMiliseconds = yearDate.getTime() - (yearDate.getDay() * oneDayMiliseconds)
    const week_date = new Date(firstWeekMiliseconds + 7 * (weekNumber - 1) * oneDayMiliseconds)
    //build the needed dates:
    const first = week_date.getTime() - 86400000*week_date.getDay()
    const last = first + 6*86400000
    return [new Date(first), new Date(last)]
}