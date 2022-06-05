
/* retrieve.js */

import { db } from './db.js'


//Show on admin's page 
export async function getAllCouriers(){
    const sql = 'SELECT courier_name, COUNT(status) AS parcels FROM parcels WHERE status="in-transit" GROUP BY courier_name'
    const result = await db.query(sql)
    // console.log(result)
    return result
}

//Show on admin's page 
export async function getCourierIndividual(courier){
    const result = await db.query(`SELECT * FROM parcels WHERE courier_name = ? ORDER BY status DESC`, [courier])
    // console.log(result)
    return result
}

//Show on courier's page 
export async function getParcels(){
    const sql = 'SELECT * FROM parcels ORDER BY status DESC'
    const dbresult = await db.query(sql)
    const result = dbresult.map(obj => {
        return {...obj, date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString()}
    })
    // console.log(result)
    return result
}

//Retrieve courier's "accepted" parcels
export async function getParcelsAccepted(courier){
    const data = await db.query(`SELECT * FROM parcels WHERE status = "in-transit" AND courier_name = ?`,[courier])
    const result = data.map(obj => {
        return {...obj, date_time_in_transit: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString()}
    })
    return result
}

// Retrieve customer sent parcels
export async function getParcelsCustomer(authorised){
    const result = await db.query('SELECT * FROM parcels WHERE sender_username = ?',[authorised])
    // console.log(result)
    return result
}
