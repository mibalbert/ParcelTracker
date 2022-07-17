/* accounts.js */

import { compare, genSalt, hash } from '../deps.js';
// import { create, verify, decode } from 'https://deno.land/x/djwt@v2.1/mod.ts'

import { db } from './db.js';

const saltRounds = 10;
const salt = await genSalt(saltRounds);

/**
 * Object - username and password from
 * the login form
 *
 * @typedef {Object} LogDetails
 * @property {string} username
 * @property {string} role
 */
/**
 * Checks user credentials.
 *
 * @param {string} username
 * @param {string} password
 * @returns {LogDetails} returns username and role
 */
export async function login(data) {
	console.log(data);
	try {
		let sql =
			`SELECT count(id) AS count FROM accounts WHERE user="${data.username}";`;
		let records = await db.query(sql);
		// console.log(records)
		if (!records[0].count) {
			throw new Error(`username "${data.username}" not found`);
		}
		sql = `SELECT pass FROM accounts WHERE user = "${data.username}";`;
		records = await db.query(sql);
		const valid = await compare(data.password, records[0].pass);
		if (valid === false) {
			throw new Error(`invalid password for account "${data.username}"`);
		}
		sql = `SELECT role FROM accounts WHERE user = "${data.username}"`;
		records = await db.query(sql);
		data.role = records[0].role;
		return { username: data.username, role: data.role };
	} catch (err) {
		console.log(err);
	}
}

/**
 * Object - username and password from
 * the register form
 *
 * @typedef {Object} RegDatails
 * @property {string} username
 * @property {string} password
 */
/**
 * Creates new user.
 *
 * @param {RegDatails} data
 * @returns {bool} returns bool
 */
export async function register(data) {
	try {
		const password = await hash(data.password, salt);
		const sql =
			`INSERT INTO accounts(user, pass) VALUES("${data.username}", "${password}")`;
		console.log(sql);
		await db.query(sql);
		return true;
	} catch (err) {
		console.log(err);
	}
}

//// Create JWT encoding and decoding for the role

// const key = 'secrete-key'
//
// /**
//  * Creates JWT Token for user permissions.
//  * @param {string} key
//  * @param {string} role
//  * @returns {string} jwt encoded 'role'
//  */
// async function encodeRole(role){
// 	const jwt = await create({alg: 'HS512', type: 'JWT'}, {role:role}, key)
// 	return jwt
// }

// /**
//  * Decodes the user role.
//  * @param {string} jwt
//  * @param {string} hash
//  * @returns {string} decoded 'role'
//  */
// export async function verifyRole(jwt){
// 	const vrf = await verify(jwt, key, 'HS512')
// 	console.log(vrf)
//  return vrf
// }
