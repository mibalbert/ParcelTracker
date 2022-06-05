
/* update.js */

import { db } from './db.js'
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";


const date_time = format(new Date(), "yyyy-MM-dd HH:mm:ss")


// Update parcel status
export async function setParcelStatus(context, data){
    const uuid = data.fields.search
    // console.log("UUID", uuid)
    let result = await db.query('SELECT * FROM parcels WHERE uuid = ?',[uuid])
    if (result[0] !== undefined){
        if (result[0].status == 'not-dispatched'){
            //Change the status to in-transit
            result = await db.query('UPDATE parcels SET status = "in-transit", date_time_in_transit = ? WHERE uuid = ?',[ date_time, uuid ])
            return "You've added a parcel to deliver!"
        }else if(result[0].status == 'in-transit'){
            //Change the status to delivered
            context.response.redirect(`/home-courier-receiver-details/${uuid}`)}
    } return "Sorry, you inputed a wrong uuid!"
}



export async function setParcelStatusDelivered(uuid, data){
    const accepted_by = data.fields.accepted_by
    const signature = data.fields.signature
    // console.log("DATA ONE: ", data)
    // console.log("FIELDS ONE:", data.fields)
    // console.log("accepted_by", accepted_by)
    // console.log("signature", signature)
    // console.log("uuid", uuid)
    const result = await db.query('UPDATE parcels SET status = "delivered", date_time_delivered = ?, recip_name = ?, recip_signature = ?  WHERE uuid = ?',
                                  [ date_time, accepted_by, signature, uuid])
    return "Recipient's details inserted. Parcel delivered!"
}



////// CHANGE - for the 'delivered' add a new function that takes in the form with 
//////          the data from the recipient and the time of delivery.

