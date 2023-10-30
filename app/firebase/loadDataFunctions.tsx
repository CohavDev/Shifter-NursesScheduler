import { db } from './firebase.config'
import {doc, getDoc} from 'firebase/firestore'
import saveDataByWeek from './saveDataFunctions'
export default async function loadDataByWeek(weekNumber:number, setData:CallableFunction){
    const year = (new Date()).getFullYear()
    const docPath = "WeeklyShifts/"+year+"_week"+weekNumber
    const docRef = doc(db, docPath)
    console.log("loadDatafunction (week #%d)....\n",weekNumber)
    await getDoc(docRef).then((querySnapShot)=>{
        var newData = querySnapShot.data()
        // console.log("Data Fetched from server:\n" + newData)
        newData = checkDataFormat(newData, weekNumber)
        setData(newData)
    })
}
const checkDataFormat = (data:any, weekNumber:number)=>{
    const days = ["Sunday", "Monday", "Tuseday", "Wednesday", "Thursday", "Friday", "Saturday"]
    var writeNewFile = false
    for (var day in days){
        day = days[day]
        day = day.toLowerCase()
        if(data == null){
            data = {}
            writeNewFile = true
        }
        if(data[day] == null){
            data[day] = [0,0,0]
        }
        if(writeNewFile){
            saveDataByWeek(weekNumber, data, ()=>{})
        }
    }
    return data
}