
/* update.js */

import { db } from './db.js'
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";


const date_time = format(new Date(), "yyyy-MM-dd HH:mm:ss")


// Update parcel status
export async function setParcelStatus(context, data, authorised){
    const uuid = data.fields.search
    // console.log("UUID", uuid)
    let result = await db.query('SELECT * FROM parcels WHERE uuid = ?',[uuid])
    if (result[0] !== undefined){
        if (result[0].status == 'not-dispatched'){
            //Change the status to in-transit
            result = await db.query('UPDATE parcels SET status = "in-transit", date_time_in_transit = ?, courier_name = ? WHERE uuid = ?',[ date_time, authorised, uuid ])
            return "You've added a parcel to deliver!"
        }else if(result[0].status == 'in-transit'){
            //Change the status to delivered
            context.response.redirect(`/home-courier-receiver-details/${uuid}`)}
    } return "Sorry, you inputed a wrong uuid!"
}

// // Update parcel status
// export async function setParcelStatus2(data, authorised){
//     const uuid = data
//     // console.log("UUID", uuid)
//     let result = await db.query('SELECT * FROM parcels WHERE uuid = ?',[uuid])
//     if (result[0] !== undefined){
//         if (result[0].status == 'not-dispatched'){
//             //Change the status to in-transit
//             result = await db.query('UPDATE parcels SET status = "in-transit", date_time_in_transit = ?, courier_name = ? WHERE uuid = ?',[ date_time, authorised, uuid ])
//             return "You've added a parcel to deliver!"
//         }//else if(result[0].status == 'in-transit'){
//             //Change the status to delivered
            
//             // context.response.redirect(`/home-courier-receiver-details/${uuid}`)}
//     } return "Sorry, you inputed a wrong uuid!"
// }


export async function setParcelStatusDelivered(uuid, data){
    const handed_to_name = data.fields.handed_to_name
    const handed_to_signature = data.fields.handed_to_signature
    const result = await db.query('UPDATE parcels SET status = "delivered", date_time_delivered = ?, handed_to_name = ?, handed_to_signature = ?  WHERE uuid = ?',
                                  [ date_time, handed_to_name, handed_to_signature, uuid])
    console.log(result)
    // return "Recipient's details inserted. Parcel delivered!"
}

