/* send.js */

import { db } from './db.js';

const dateTimeCreated = new Date();

/**
 * Object compriesed of form data
 * inputed by the user
 *
 * @typedef {Object} Details
 * @property {string} recipient_name
 * @property {string} sender_address
 * @property {string} sender_address_details
 * @property {string} sender_city
 * @property {string} sender_country
 * @property {string} recipient_address
 * @property {string} recipient_address_details
 * @property {string} recipient_city
 * @property {string} recipient_postcode
 * @property {string} recipient_country
 * @property {number} weight_kg
 * @property {string} sender_username
 * @property {Date} date_time_created
 * @property {string} uuid
 */
/**
 * Adds a new parcel to the db based on
 * object from the user filled form
 *
 * @param {Details} data
 * @param {string} authorised
 * @returns {bool} returns bool
 */
export async function addParcel(data, authorised) {
	try {
		const parcel = data.fields;
		console.log(parcel);
		const senderUsername = await authorised;
		const result = await db.query(
'INSERT INTO parcels           \
			(	recipient_name,            \
				sender_address,            \
				sender_address_details,    \
				sender_city,               \
				sender_postcode,           \
				sender_country,            \
				recipient_address,         \
				recipient_address_details, \
				recipient_city,            \
				recipient_postcode,        \
				recipient_country,         \
				weight_kg,                 \
				sender_username,           \
				date_time_created,         \
				uuid                       \
			)                              \
			VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, UUID())',
			[
				parcel.recipient_name,
				parcel.sender_address,
				parcel.sender_address_details,
				parcel.sender_city,
				parcel.sender_postcode,
				parcel.sender_country,
				parcel.recipient_address,
				parcel.recipient_address_details,
				parcel.recipient_city,
				parcel.recipient_postcode,
				parcel.recipient_country,
				parcel.weight_kg,
				senderUsername,
				dateTimeCreated,
			],
		);
		console.log(result);
		return true;
	} catch (err) {
		console.log(err);
	}
}
