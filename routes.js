
/* routes.js */

import { Router } from 'oak'
import { Handlebars } from 'handlebars'

import { login, register } from 'accounts'
import { addParcel } from './modules/send.js'
import { getParcels } from './modules/retrieve.js'

const handle = new Handlebars({ defaultLayout: '' })

const router = new Router()

// the routes defined here
// Main homepage - describes the project
router.get('/', async context => {
	const authorised = await context.cookies.get('authorised')
	const data = { authorised }
	const body = await handle.renderView('home', data)
	context.response.body = body
})

router.get('/login', async context => {
	const body = await handle.renderView('login')
	context.response.body = body
})

router.get('/register', async context => {
	const body = await handle.renderView('register')
	context.response.body = body
})

router.post('/register', async context => {
	console.log('POST /register')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	await register(obj)
	context.response.redirect('/login')
})

router.get('/logout', async context => {
  // context.cookies.set('authorised', null) // this does the same
	await context.cookies.delete('authorised')
	await context.cookies.delete('permission')
	context.response.redirect('/')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const data = await login(obj)
		await context.cookies.set('authorised', data.username)
		await context.cookies.set('permission', data.role)
		context.response.redirect('/')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})


// Courier home page 
router.get('/home-courier', async context => {
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised == undefined || permission !== ('courier','admin')) context.response.redirect('/login')
	const parcels = await getParcels()
	const data = { authorised, parcels }
	const body = await handle.renderView('home-courier', data)
	context.response.body = body
})


// // Customer home page
// router.get('/home-courier', async context => {
// 	const authorised = await context.cookies.get('authorised')
// 	const permission = await context.cookies.get('permission')
// 	console.log(permission !== 'courier' || permission !== 'admin')
// 	if (authorised == undefined && permission !== 'courier') context.response.redirect('/login')
// 	// if (authorised !== undefined && permission == 'courier') context.response.redirect('/home-courier')
// 	const parcels = await getParcels()
// 	const data = { authorised, parcels }
// 	const body = await handle.renderView('home-courier', data)
// 	context.response.body = body
// })

// Customer send parcel page
router.get('/send', async context => {
	console.log('GET /send')
	const authorised = context.cookies.get('authorised')
	const permission = context.cookies.get('permission')
	if(authorised === undefined) context.response.redirect('/')
	const data = { authorised }
	const body = await handle.renderView('send', data)
	context.response.body = body
})

router.post('/send', async context =>{
	console.log('/POST /send')
	const body = context.request.body({type: 'form-data'})
	const data = await body.value.read()
	const authorised = context.cookies.get('authorised')
	const result = await addParcel(data, authorised)
	context.response.redirect('/')
})



export default router
