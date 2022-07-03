/* retrieve.js */

import { db } from './db.js';

///////	Admin

/**
 * Db call - Returns all the parcels ordered by status
 * starting from not-dispatced and by date_time_created
 * ordered desc (From last inserted).
 * @function getAllParcels
 * @async
 * @param {void} void
 * @returns {Array} data Parcel details
 */
export async function getAllParcels() {
	const data = await db.query(
		'SELECT * FROM parcels ORDER BY status DESC, date_time_created DESC',
	);
	return data;
}

/**
 * Db call - Returns couriers by name and number of parcels
 * currently 'accepted'.
 * @function getAllCouriers
 * @async
 * @param {void} void
 * @returns {Array} data Courier name and number of parcels accepted
 */
export async function getAllCouriers() {
	const data = await db.query(
		'SELECT courier_name, COUNT(status) AS parcels FROM parcels WHERE status="in-transit" GROUP BY courier_name',
	);
	return data;
}

// export async function getCourierIndividual(courier) {
// 	const result = await db.query('SELECT * FROM parcels WHERE courier_name = ? ORDER BY status DESC, date_time_created DESC',[courier]);
// 	// console.log(result)
// 	return result;
// }

/////// Courier

/**
 * Db call - Returns all the parcels available to be
 * accepted by the courier.
 * @function getNotDispParcels
 * @async
 * @param {void} void
 * @returns {Array} data Parcel details
 */
export async function getNotDispParcels() {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="not-dispatched"  ORDER BY date_time_created DESC',
	);
	return data;
}

/**
 * Db call - Returns the accepted parcels for the currently logged in
 * courier, ordered by last accepted.
 * @function getParcelsAccepted
 * @async
 * @param {string} courier Username of current courier
 * @returns {Array} data Parcel details
 */
export async function getParcelsAccepted(courier) {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="in-transit" AND courier_name = ? ORDER BY date_time_in_transit ASC',
		[courier],
	);
	return data;
}

/**
 * Db call - Returns the delivered parcels of current courier ordered
 * by when they where delivered from last deliverd.
 * @function getParcelsDelivered
 * @async
 * @param {string} authorised Username of current courier
 * @returns {Array} data Parcel details
 */
export async function getParcelsDelivered(authorised) {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="delivered" AND courier_name=? ORDER BY date_time_delivered DESC',
		[authorised],
	);
	return data;
}

///////	Customer

/**
 * Db call - Returns the all parcels except delivered ones
 * of the currently logged in customer, ordered by
 * last 'accepted'.
 * @function getCurrentParcelsCustomer
 * @async
 * @param {string} authorised Username of current customer
 * @returns {Array} data Parcel details
 */
export async function getCurrentParcelsCustomer(authorised) {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status != "delivered" AND sender_username = ? ORDER BY status DESC, date_time_in_transit ASC',
		[authorised],
	);
	return data;
}

/**
 * Db call - Returns the delivered parcels of the currently logged in
 * customer, ordered by last 'created'.
 * @function getParcelsCustomer
 * @async
 * @param {string} authorised Username of current customer
 * @returns {Array} data Parcel details
 */
export async function getParcelsCustomer(authorised) {
	const data = await db.query(
		'SELECT * FROM parcels WHERE status="delivered" AND sender_username = ? ORDER BY status DESC, date_time_created DESC',
		[authorised],
	);
	return data;
}

///////	Individual Parcel

/**
 * Db call - Returns all the details of a parcel based on uuid
 * @function getParcelDetails
 * @async
 * @param {string} uuid uuid of one parcel
 * @returns {Array} data Parcel details
 */
export async function getParcelDetails(uuid) {
	const data = await db.query('SELECT * FROM parcels WHERE uuid = ?', [uuid]);
	return data;
}

//	Home page

/**
 * Db call - Returns the accepted, in-transit and delivered
 * parcels; the couriers and customers of admin
 * @function getAdminParcelsCouriers
 * @async
 * @param {void} void
 * @returns {Array<number>} data Parcel details
 */
export async function getAdminParcelsCouriers() {
	let totalInstore = await db.query(
		'SELECT COUNT(status) AS parcels_instore FROM parcels WHERE status="not-dispatched"',
	);
	let totalAccepted = await db.query(
		'SELECT COUNT(status) AS parcels_accepted FROM parcels WHERE status="in-transit"',
	);
	let totalDelivered = await db.query(
		'SELECT COUNT(status) AS parcels_delivered FROM parcels WHERE status="delivered"',
	);
	let totalCouriers = await db.query(
		'SELECT COUNT(user) AS couriers FROM accounts WHERE role="courier"',
	);
	let totalCustomers = await db.query(
		'SELECT COUNT(user) AS customers FROM accounts WHERE role="customer"',
	);
	totalInstore = totalInstore[0].parcels_instore;
	totalAccepted = totalAccepted[0].parcels_accepted;
	totalDelivered = totalDelivered[0].parcels_delivered;
	totalCouriers = totalCouriers[0].couriers;
	totalCustomers = totalCustomers[0].customers;
	// console.log(totalInstore, totalAccepted, totalDelivered, totalCouriers, totalCustomers)
	return {
		totalInstore,
		totalAccepted,
		totalDelivered,
		totalCouriers,
		totalCustomers,
	};
}

/**
 * Db call - Returns the accepted, in-transit and delivered
 * parcels as numbers of the logged courier
 * @function getCourierParcels
 * @async
 * @param {string} authorised courier username
 * @returns {Array<number>} data Parcel details
 */
export async function getCourierParcels(authorised) {
	let instore = await db.query(
		'SELECT COUNT(status) AS parcels_instore FROM parcels WHERE status="not-dispatched"',
	);
	let accepted = await db.query(
		'SELECT COUNT(status) AS parcels_accepted FROM parcels WHERE status="in-transit" AND courier_name=?',
		[authorised],
	);
	let delivered = await db.query(
		'SELECT COUNT(status) AS parcels_delivered FROM parcels WHERE status="delivered" AND courier_name=?',
		[authorised],
	);
	instore = instore[0].parcels_instore;
	accepted = accepted[0].parcels_accepted;
	delivered = delivered[0].parcels_delivered;
	// console.log(instore, accepted, delivered)
	return { instore, accepted, delivered };
}

/**
 * Db call - Returns the accepted, in-transit and delivered
 * parcels as numbers of the logged customer
 * @function getCustomerParcels
 * @async
 * @param {string} authorised customer username
 * @returns {Array<number>} data Parcel details
 */
export async function getCustomerParcels(authorised) {
	let totalNotDispatched = await db.query(
		'SELECT COUNT(sender_username) AS parcels_not_dispatched FROM parcels WHERE status="not-dispatched" AND sender_username=?',
		[authorised],
	);
	let totalTransit = await db.query(
		'SELECT COUNT(sender_username) AS parcels_in_transit FROM parcels WHERE status="in-transit" AND sender_username=?',
		[authorised],
	);
	let totalDelivered = await db.query(
		'SELECT COUNT(sender_username) AS parcels_delivered FROM parcels WHERE status="delivered" AND sender_username=?',
		[authorised],
	);
	totalNotDispatched = totalNotDispatched[0].parcels_not_dispatched;
	totalTransit = totalTransit[0].parcels_in_transit;
	totalDelivered = totalDelivered[0].parcels_delivered;
	// console.log(totalNotDispatched, totalTransit, totalDelivered)
	return { totalNotDispatched, totalTransit, totalDelivered };
}
