
/* retrieve.js */

import { db } from 'db'

export async function getParcels(){
    const sql = `SELECT * FROM parcels`
    const result = await db.query(sql)
    // console.log(result)
    return result
}

// Retrieve customer sent parcels
export async function getParcelsCustomer(authorised){
    const sql = `SELECT * FROM parcels WHERE sender_username = "${authorised}"`
    const result = await db.query(sql)
    // console.log(result)
    return result
}


// Update parcel status
export async function setParcelStatus(data){
    const uuid = data.fields.search
    let sql = `UPDATE parcels SET status = "in-transit" WHERE uuid = "${uuid}"`
    let result = await db.query(sql)
    sql = `SELECT * FROM parcels WHERE uuid = "${uuid}"`
    result = await db.query(sql)
    // console.log(result)
    return result
}

// Retrieve customer sent parcels
export async function getParcelsAccepted(){
    const sql = `SELECT * FROM parcels WHERE status = "in-transit"`
    const result = await db.query(sql)
    // console.log(result)
    return result
}


