/* update.js */

import { db } from './db.js';
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';

const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

// Set parcel status to 'in-transit'
export async function setParcelStatus(obj, authorised) {
	const uuid = obj.uuid;
	let result = await db.query('SELECT * FROM parcels WHERE uuid = ?', [uuid]);

	if (result[0].status === 'not-dispatched') {
		//Change the status to in-transit
		result = await db.query(
			'UPDATE parcels SET status = "in-transit", date_time_in_transit = ?, courier_name = ? WHERE uuid = ?',
			[dateTime, authorised, uuid],
		);
		return { status: 200, message: 'You\'ve added a parcel to deliver!' };
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
