/* accounts.js */

import { compare, genSalt, hash } from 'bcrypt';
// import { create, verify, decode } from 'https://deno.land/x/djwt@v2.1/mod.ts'

import { db } from 'db';

const saltRounds = 10;
const salt = await genSalt(saltRounds);

// const key = 'secrete-key'

/**
 * Checks user credentials.
 * @param {string} username
 * @param {string} password
 * @returns {string} the username for the valid account
 */
export async function login(data) {
	console.log(data);
	let sql =
		`SELECT count(id) AS count FROM accounts WHERE user="${data.username}";`;
	let records = await db.query(sql);
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
	// const role = records[0].role
	// data.role = await encodeRole(role)
	data.role = records[0].role;
	console.log(data.role);
	return { username: data.username, role: data.role };
}

/**
 * Adds x and y.
 * @param {number} x
 * @param {number} y
 * @returns {number} Sum of x and y
 */
export async function register(data) {
	const password = await hash(data.password, salt);
	const sql =
		`INSERT INTO accounts(user, pass) VALUES("${data.username}", "${password}")`;
	console.log(sql);
	await db.query(sql);
	return true;
}

// /**
//  * Creates JWT Token for user permissions.
//  * @param {string} key
//  * @param {string} role
//  * @returns {string} JWT encoded 'role'
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
// 	const veri = await verify(jwt, key, 'HS512')
// 	console.log(veri)
// }
