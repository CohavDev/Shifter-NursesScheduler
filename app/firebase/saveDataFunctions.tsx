import { db } from './firebase.config'
import {doc, getDoc, setDoc} from 'firebase/firestore'
export default async function saveDataByWeek(weekNumber:number, data:Object, confirmSaveCallBack:CallableFunction){
    const year = (new Date()).getFullYear()
    const docPath = "WeeklyShifts/"+year+"_week"+weekNumber
    const docRef = doc(db, docPath)
    console.log("saveDatafunction (week #%d)....\n",weekNumber)
    await setDoc(docRef, data).then((querySnapShot)=>{
        console.log("saved data to server")
        confirmSaveCallBack()
    })
}