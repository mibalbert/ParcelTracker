
/* retrieve.js */

import { db } from './db.js'

//Show on courier's page 
export async function getParcels(){
    const sql = 'SELECT * FROM parcels'
    const dbresult = await db.query(sql)
    const result = dbresult.map(obj => {
        return {...obj, date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString()}
    })
    // console.log(result)
    return result
}


//Retrieve courier's "accepted" parcels
export async function getParcelsAccepted(){
    const sql = 'SELECT * FROM parcels WHERE status = "in-transit"'
    const result = await db.query(sql)
    // console.log(result)
    return result
}


// Retrieve customer sent parcels
export async function getParcelsCustomer(authorised){
    const result = await db.query('SELECT * FROM parcels WHERE sender_username = ?',[authorised])
    // console.log(result)
    return result
}
