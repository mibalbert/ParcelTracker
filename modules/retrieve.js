
/* retrieve.js */

import { db } from 'db'

export async function getParcels(){
    const sql = `SELECT * FROM parcels`
    const result = await db.query(sql)
    // console.log(result)
    return result
}




