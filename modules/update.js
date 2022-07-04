/* update.js */

import { db } from './db.js';
import { format } from 'https://deno.land/std@0.91.0/datetime/mod.ts';

const dateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');

/**
 * Object from db response containing status code
 * and message to be later sent back to axios 
 * and handled as an 'alert'
 * 
 * @typedef {Object} Response
 * @property {number} status response status code
 * @property {string} message response message
 */
/**
 * Db call - Returns all the parcels ordered by status
 * starting from not-dispatced and by date_time_created
 * ordered desc (From last inserted).
 * 
 * @param {string} uuid parcel's unique identifier
 * @returns {Response} data Parcel details
 */
export async function setParcelStatus(uuid, authorised) {
	try {
		let result = await db.query('SELECT * FROM parcels WHERE uuid = ?', [
			uuid,
		]);
		if (!result[0].status) {
			throw new Error(`uuid: "${uuid}" not found`);
		}
		if (result[0].status === 'not-dispatched') {
			//Change the status to in-transit
			result = await db.query(
				'UPDATE parcels SET status = "in-transit", date_time_in_transit = ?, courier_name = ? WHERE uuid = ?',
				[dateTime, authorised, uuid],
			);
			return {
				status: 200,
				message: 'Success! You have accepted a new parcel!',
			};
		} else if (result[0].status === 'in-transit') {
			return {
				status: 409,
				message: 'Conflict! Parcel already in-transit!',
			};
		} else if (result[0].status === 'delivered') {
			return {
				status: 403,
				message: 'Forbiden! Parcel already delivered!',
			};
		} else {
			return {
				status: 404,
				message: 'Not Found! Cannot find the uuid in the database!',
			};
		}
	} catch (err) {
		console.log(err);
	}
}

/**
 * Object from the axios post request conprised of
 * the name of person recieving the parcels and 
 * their signature
 * 
 * @typedef {Object} Data
 * @property {string} handed_to_name name of recipient
 * @property {string} handed_to_signature blob image of recipient signature
 */
/**
 * Db call - Sets the status to deliver.
 * Adds the name and signature of person receiving
 * the parcel into the db based on uuid
 * 
 * @param {string} uuid parcel's unique identifier
 * @param {Data} data name and signature of recipient
 * @returns {bool} returns bool
 */
export async function setParcelStatusDelivered(uuid, data) {
	try {
		const name = data.recipientName;
		const signature = data.recipientSignature;
		const result = await db.query(
			'UPDATE parcels SET status = "delivered", date_time_delivered = ?, handed_to_name = ?, handed_to_signature = ?  WHERE uuid = ?',
			[dateTime, name, signature, uuid],
		);
		if (!result.affectedRows === 1) {
			throw new Error('Internal Server Error');
		} else {
			return {
				status: 200,
				message: 'Success! Parcel Delivered!',
			};
		}
	} catch(err) {
		console.log(err)
	}	
}
