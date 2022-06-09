
/* send.js */

import { db } from 'db'
import { format } from "https://deno.land/std@0.91.0/datetime/mod.ts";


const date_time_created = format(new Date(), "yyyy-MM-dd HH:mm:ss")

export async function addParcel(data, authorised){
    const parcel = data.fields
    console.log("THIS IS IN THE SEND JS",parcel)

    const sender_username = await authorised
    // const result = await db.query('INSERT INTO parcels (sender_postcode, recipient_postcode, weight_kg, recipient_name, \
    //                               full_address, sender_username, uuid, date_time_created) VALUES ( ?, ?, ?, ?, ?, ?, UUID(), ?)',
    //                               [ parcel.sender_postcode, parcel.recipient_postcode, parcel.slider, parcel.recipient_name, parcel.full_address, sender_username, date_time_created ] )
    // console.log(result)
    // return 1
}


