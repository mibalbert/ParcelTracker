/* update.js */

import { db } from './db.js';
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';

const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

// Set parcel status to 'in-transit'
export async function setParcelStatus(obj, authorised) {
	const uuid = obj.uuid;
	try{	
		let result = await db.query('SELECT * FROM parcels WHERE uuid = ?', [uuid]);
		// if (result[0].status === undefined ) throw new Error ('Wrong uuid inputed')
		if (result[0].status === 'not-dispatched') {
			//Change the status to in-transit
			result = await db.query(
				'UPDATE parcels SET status = "in-transit", date_time_in_transit = ?, courier_name = ? WHERE uuid = ?',
				[dateTime, authorised, uuid],
			);
			return {
				status: 200,
				message: 'You have accepted a new parcel to deliver!',
			};
		} else if (result[0].status === 'in-transit') {
			return { status: 409, message: 'Conflict! Parcel already in-transit!' };
		} else if (result[0].status === 'delivered') {
			return { status: 403, message: 'Forbiden! Parcel already delivered!' };
		} else {
			return {
				status: 404,
				message: 'Not Found! Cannot find the uuid in the database!',
			};
		}
	} catch(err) {
		console.log(err)
	}
	
	
}

export async function setParcelStatusDelivered(uuid, data) {
	const handedToName = data.fields.handed_to_name;

	const handedToSignature = data.fields.handed_to_signature;
	const result = await db.query(
		'UPDATE parcels SET status = "delivered", date_time_delivered = ?, handed_to_name = ?, handed_to_signature = ?  WHERE uuid = ?',
		[dateTime, handedToName, handedToSignature, uuid],
	);
	console.log(result);
	// return "Recipient's details inserted. Parcel delivered!"
}
