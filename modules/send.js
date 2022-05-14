
/* send.js */

import { db } from 'db'

export async function addParcel(data, authorised){
    const parcel = data.fields
    const sender_username = await authorised
    const sql = (`INSERT INTO parcels (sender_postcode, recipient_postcode, weight_kg, recipient_name, \
                    full_address, sender_username, uuid) \
                  VALUES ( "${parcel.sender_postcode}", "${parcel.recipient_postcode}", \
                    "${parcel.weight_kg}", "${parcel.recipient_name}", "${parcel.full_adress}", \
                    "${sender_username}", UUID() )`)
    const result = await db.query(sql)
    console.log(result)
    return 1
}





