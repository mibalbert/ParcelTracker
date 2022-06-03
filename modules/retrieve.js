
/* retrieve.js */

import { db } from './db.js'

export async function getParcels(){
    const sql = `SELECT * FROM parcels`
    const result = await db.query(sql)
    // console.log(result)
    return result
}

// Retrieve customer sent parcels
export async function getParcelsCustomer(authorised){
    let sql = `SELECT * FROM parcels WHERE sender_username = "${authorised}"`
    let result = await db.query(sql)
    // console.log(result)
    return result
}




// Update parcel status
export async function setParcelStatus(data){
    const uuid = data.fields.search
    console.log("UUID", uuid)
    let sql = `SELECT * FROM parcels WHERE uuid = "${uuid}"`
    let result = await db.query(sql)
    if (result[0] !== undefined){
        if (result[0].status == 'not-dispatched'){
            sql = `UPDATE parcels SET status = "in-transit" WHERE uuid = "${uuid}"`
            result = await db.query(sql)
            return 'green'
        }else if(result[0].status == 'in-transit'){
            sql = `UPDATE parcels SET status = "delivered" WHERE uuid = "${uuid}"`
            result = await db.query(sql)
            return 'yellow'
        }
    } 
    console.log('Wrong uuid bby!')
    return 'red'
}

//Retrieve customer sent parcels
export async function getParcelsAccepted(){
    const sql = `SELECT * FROM parcels WHERE status = "in-transit"`
    const result = await db.query(sql)
    // console.log(result)
    return result
}


