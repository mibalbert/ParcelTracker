/* retrieve.js */

import { db } from './db.js';

///////	Admin

export async function getAllParcels() {
	const data = await db.query('SELECT * FROM parcels ORDER BY status DESC, date_time_created DESC');
	return data;
}

export async function getAllCouriers() {
	const result = await db.query('SELECT courier_name, COUNT(status) AS parcels FROM parcels WHERE status="in-transit" GROUP BY courier_name');
	return result;
}

// export async function getCourierIndividual(courier) {
// 	const result = await db.query('SELECT * FROM parcels WHERE courier_name = ? ORDER BY status DESC, date_time_created DESC',[courier]);
// 	// console.log(result)
// 	return result;
// }



/////// Courier

export async function getNotDispParcels() {
	const data = await db.query('SELECT * FROM parcels WHERE status="not-dispatched"  ORDER BY date_time_created DESC');
	return data;
}

export async function getParcelsAccepted(courier) {
	const data = await db.query('SELECT * FROM parcels WHERE status="in-transit" AND courier_name = ? ORDER BY date_time_in_transit ASC',[courier]);
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
	const data = await db.query('SELECT * FROM parcels WHERE status="delivered" AND courier_name=? ORDER BY date_time_delivered DESC',[authorised]);
	return data;
}

///////	Customer

export async function getParcelsCustomer(authorised) {
	const result = await db.query('SELECT * FROM parcels WHERE status="delivered" AND sender_username = ? ORDER BY status DESC, date_time_created DESC',[authorised]);
	return result;
}

export async function getCurrentParcelsCustomer(authorised) {
	const result = await db.query('SELECT * FROM parcels WHERE status != "delivered" AND sender_username = ? ORDER BY status DESC, date_time_in_transit ASC',[authorised]);
	return result;
}

export async function getParcelDetails(uuid) {
	const data = await db.query('SELECT * FROM parcels WHERE uuid = ?', [uuid]);
	return data;
}


//	Home page 

export async function getAdminParcelsCouriers() {
	let totalInstore = await db.query(
		'SELECT COUNT(status) AS parcels_instore FROM parcels WHERE status="not-dispatched"');
	let totalAccepted = await db.query(
		'SELECT COUNT(status) AS parcels_accepted FROM parcels WHERE status="in-transit"');
	let totalDelivered = await db.query(
		'SELECT COUNT(status) AS parcels_delivered FROM parcels WHERE status="delivered"');
	let totalCouriers = await db.query(
		'SELECT COUNT(user) AS couriers FROM accounts WHERE role="courier"');
	let totalCustomers = await db.query(
		'SELECT COUNT(user) AS customers FROM accounts WHERE role="customer"');
	totalInstore = totalInstore[0].parcels_instore 
	totalAccepted = totalAccepted[0].parcels_accepted
	totalDelivered = totalDelivered[0].parcels_delivered
	totalCouriers = totalCouriers[0].couriers
	totalCustomers = totalCustomers[0].customers
	// console.log(totalInstore, totalAccepted, totalDelivered, totalCouriers, totalCustomers)
	return {totalInstore, totalAccepted, totalDelivered, totalCouriers, totalCustomers};
}

export async function getCourierParcels(authorised) {
	let instore = await db.query(
		'SELECT COUNT(status) AS parcels_instore FROM parcels WHERE status="not-dispatched"');
	let accepted = await db.query(
		'SELECT COUNT(status) AS parcels_accepted FROM parcels WHERE status="in-transit" AND courier_name=?',[authorised]);
	let delivered = await db.query(
		'SELECT COUNT(status) AS parcels_delivered FROM parcels WHERE status="delivered" AND courier_name=?',[authorised]);
	instore = instore[0].parcels_instore 
	accepted = accepted[0].parcels_accepted
	delivered = delivered[0].parcels_delivered
	// console.log(instore, accepted, delivered)
	return {instore, accepted, delivered};
}

export async function getCustomerParcels(authorised) {
	let totalTransit = await db.query(
		'SELECT COUNT(sender_username) AS parcels_in_transit FROM parcels WHERE status="in-transit" AND sender_username=?',[authorised]);
	let totalDelivered = await db.query(
		'SELECT COUNT(sender_username) AS parcels_delivered FROM parcels WHERE status="delivered" AND sender_username=?',[authorised]);
	totalTransit = totalTransit[0].parcels_in_transit 
	totalDelivered = totalDelivered[0].parcels_delivered
	// console.log(totalTransit, totalDelivered)
	return {totalTransit, totalDelivered};
}
	