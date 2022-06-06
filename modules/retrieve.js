
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
    const result = await db.query('SELECT * FROM parcels WHERE courier_name = ? ORDER BY status DESC, date_time_created DESC', [courier])
    // console.log(result)
    return result
}

//Show on admin's home page 
export async function getAllParcels(){
    const data = await db.query('SELECT * FROM parcels ORDER BY status DESC, date_time_created DESC')
    const result = data.map(obj => {
            return {...obj, date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString()}
        }) // Changes the displayed date format
    return result
}


// Show on courier's home page 
export async function getParcels(){
    const data = await db.query('SELECT * FROM parcels WHERE status="in-transit" OR status="not-dispatched"  ORDER BY status DESC, date_time_created DESC')
    const result = data.map(obj => {
            return {...obj, date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString()}
        }) // Changes the displayed date format
    return result
}

// Show on courier's transit page 
// Retrieve courier's "accepted" parcels
export async function getParcelsAccepted(courier){
    const data = await db.query('SELECT * FROM parcels WHERE status = "in-transit" AND courier_name = ?',[courier])
    const result = data.map(obj => {
            return {...obj, date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString(),
                            date_time_in_transit: obj.date_time_in_transit.toDateString() + " " + obj.date_time_in_transit.toLocaleTimeString()}
        }) // Changes the displayed date format
    return result
}

// Show on 
// Retrieve customer sent parcels
export async function getParcelsCustomer(authorised){
    const result = await db.query('SELECT * FROM parcels WHERE sender_username = ? ORDER BY status DESC, date_time_created DESC',[authorised])
    // const result = await pretiDateTime(data)
    return result
}

// Retrieve individual parcel details 
export async function getParcelDetails(uuid){
    const data = await db.query('SELECT * FROM parcels WHERE uuid = ?',[uuid])
    return data
}


// function pretiDateTime(data){
//     const result = data.map(obj => {
//         if (obj!=null){
//             return {...obj, date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString(),
//                                     date_time_in_transit: obj.date_time_in_transit.toDateString() + " " + obj.date_time_in_transit.toLocaleTimeString(),
//                                     date_time_delivered: obj.date_time_delivered.toDateString() + " " + obj.date_time_delivered.toLocaleTimeString()
//                 }
//         })
//     return result
// }




// const result = data.map(obj => {
//             return {...obj, 
//                         // if(obj.date_time_created != null) { return date_time_created: obj.date_time_created.toDateString() + " " + obj.date_time_created.toLocaleTimeString()},
//                         // else{ date_time_created: null },
//                         // if(obj.date_time_in_transit != null) { return date_time_in_transit: obj.date_time_in_transit.toDateString() + " " + obj.date_time_in_transit.toLocaleTimeString()},
//                         if( date_time_delivered == null) { return date_time_in_transit: obj.date_time_delivered.toDateString() + " " + obj.date_time_delivered.toLocaleTimeString()} 
//                         }
//         })