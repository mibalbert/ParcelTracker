/* retrieve.js */

import { db } from './db.js';

//Show on admin's page
export async function getAllCouriers() {
	const sql =
		'SELECT courier_name, COUNT(status) AS parcels FROM parcels WHERE status="in-transit" GROUP BY courier_name';
	const result = await db.query(sql);
	// console.log(result)
	return result;
}

//Show on admin's page
export async function getCourierIndividual(courier) {
	const result = await db.query(
		'SELECT * FROM parcels WHERE courier_name = ? ORDER BY status DESC, date_time_created DESC',
		[courier],
	);
	// console.log(result)
	return result;
}

//Show on admin's home page
export async function getAllParcels() {
	const data = await db.query(
		'SELECT * FROM parcels ORDER BY status DESC, date_time_created DESC',
	);
	return data;
}

// Show on courier's home page
export async function getNotDispParcels() {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="not-dispatched"  ORDER BY date_time_created DESC',
	);
	return data;
}

// Show on courier's transit page
// Retrieve courier's "accepted" parcels
export async function getParcelsAccepted(courier) {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="in-transit" AND courier_name = ? ORDER BY date_time_in_transit ASC',
		[courier],
	);
	return data;
}

// Show on
// Retrieve customer sent parcels
export async function getParcelsCustomer(authorised) {
	const result = await db.query(
		'SELECT * FROM parcels WHERE status="delivered" AND sender_username = ? ORDER BY status DESC, date_time_created DESC',
		[authorised],
	);
	// const result = await pretiDateTime(data)
	return result;
}

// Retrieve customer current parcels
export async function getCurrentParcelsCustomer(authorised) {
	const result = await db.query(
		'SELECT * FROM parcels WHERE status != "delivered" AND sender_username = ? ORDER BY status DESC, date_time_created DESC',
		[authorised],
	);
	// const result = await pretiDateTime(data)
	return result;
}

// Retrieve individual parcel details
export async function getParcelDetails(uuid) {
	const data = await db.query('SELECT * FROM parcels WHERE uuid = ?', [uuid]);
	return data;
}

/**
 * Retrieves data from db containing delivered parcels details.
 * @async
 * @function getParcelsDelivered
 * @param {string} authorised Username of current user
 * @returns {object} data Parcel's details
 */
export async function getParcelsDelivered(authorised) {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="delivered" AND courier_name=? ORDER BY date_time_delivered DESC',
		[authorised],
	);
	return data;
}


// For the Home page 

export async function getCourierParcels(authorised) {
	// const data = []
	let instore = await db.query(
		'SELECT COUNT(status) AS parcels_instore FROM parcels WHERE status="not-dispatched"');
	let accepted = await db.query(
		'SELECT COUNT(status) AS parcels_accepted FROM parcels WHERE status="in-transit" AND courier_name=?',[authorised]);
	let delivered = await db.query(
		'SELECT COUNT(status) AS parcels_delivered FROM parcels WHERE status="delivered" AND courier_name=?',[authorised]);
	// data.push(instore)
	// data.push(accepted)
	// data.push(delivered)
	
	instore = instore[0].parcels_instore 
	accepted = accepted[0].parcels_accepted
	delivered = delivered[0].parcels_delivered

	// console.log(instore, accepted, delivered)
	return {instore, accepted, delivered};
}

export async function getAdminParcels() {
	return 1
}

export async function getAdminCouriers() {
	return 1
}

export async function getCustomerParcels() {
	return 1
}
	