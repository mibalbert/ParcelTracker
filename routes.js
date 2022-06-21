
/* routes.js */

// import { yey } from './publi/util.js'

import { Router } from 'oak'
import { Handlebars } from 'handlebars'

import { login, register } from 'accounts'
import { addParcel } from './modules/send.js'

import { handlebarsHelper1, 
		 handlebarsHelper2, 
		 handlebarsHelper3 } from './modules/handlebarsHelpers.js'

import { getCourierIndividual, 
		 getAllCouriers, 
		 getAllParcels, 
		 getNotDispParcels,  
		 getParcelsCustomer, 
		 getParcelsAccepted,
		 getParcelsDelivered,
		 getParcelDetails } from './modules/retrieve.js'

import { setParcelStatus, setParcelStatusDelivered } from './modules/update.js'

const handle = new Handlebars({ 
						defaultLayout: '',	
						helpers:{
							lol : handlebarsHelper1
							// lop : handlebarsHelper2,
							// pop : handlebarsHelper3
						}
					})


const router = new Router()


// the routes defined here
// Main homepage - describes the project
router.get('/', async context => {
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = { customer : permission === 'customer', 
				  courier : permission === 'courier',
				  admin : permission === 'admin'}
	
	const parcels = await getAllParcels()
	// console.log(parcels)
	const data = { authorised, role, parcels }
	const body = await handle.renderView('home', data)
	context.response.body = body
})




/////// Get short date to be displayed for......


///// Get the uuid of the parcel u want to change and 
///// then get the 'authorised' inside the post and 
///// then change the status and who accepted it 
///// based on uuid and authorised


// 	context.response.status = Status.ok
// The HTTP Status Code	response.status.	404
// The HTTP Status Text.	response.statusText.	not found




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


// Admin route to see all couriers page 
router.get('/home-admin-c', async context => {
	console.log('/GET /home-admin-c')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'admin'
	if (authorised === undefined || role) context.response.redirect('/login')
	const couriers = await getAllCouriers()
	// console.log(parcels)
	const data = { authorised, couriers }
	const body = await handle.renderView('home-admin-c', data)
	context.response.body = body
})


// Admin route to see individual courier page
router.get('/home-admin-c-indiv/:courier', async context => {
	console.log('/GET /home-admin-c')
	const courier = context.params.courier
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'admin'
	if (authorised === undefined || role) context.response.redirect('/login')
	const result = await getCourierIndividual(courier)
	// console.log(parcels)
	const data = { authorised, result, courier }
	const body = await handle.renderView('home-admin-c-indiv', data)
	context.response.body = body
})


// Admin route to see all parcels page
router.get('/home-admin-p', async context => {
	console.log('/GET /home-admin-p')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'admin'
	if (authorised === undefined || role) context.response.redirect('/login')
	const parcels = await getAllParcels()
	// console.log(parcels)
	const data = { authorised, parcels }
	const body = await handle.renderView('home-admin-p', data)
	context.response.body = body
})


// Courier home page 
router.get('/home-courier-p', async context => {
	console.log('/GET /home-courier-p')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'courier' && permission !== 'admin'
	if (authorised === undefined || role) context.response.redirect('/login')
	const parcels = await getNotDispParcels()
	// console.log(parcels)
	const data = { authorised, parcels }
	const body = await handle.renderView('home-courier-p', data)
	context.response.body = body
})


// Courier POST transit page 
router.post('/home-courier-p/:uuid', async context => {
	console.log('/POST /home-courier-p')
	const authorised = await context.cookies.get('authorised')
	const data = context.params.uuid
	await setParcelStatus2(data, authorised)
	context.response.redirect('/home-courier-transit')
	}
)



// Courier transit page 
router.get('/home-courier-transit', async context => {
	console.log('/GET /home-courier-transit')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'courier'
	if (authorised === undefined || role) context.response.redirect('/login')
	const parcels = await getParcelsAccepted(authorised)
	const data = { authorised, parcels }    
	console.log(parcels)
	const body = await handle.renderView('home-courier-transit', data)
	context.response.body = body
})


// Courier POST transit page 
router.post('/home-courier-transit', async context => {
	console.log('/POST /home-courier-transit')

	const body = context.request.body({ type: 'json' })
	const parsedBody = await body.value
	console.log(parsedBody.uuid)
	// if(parsedBody.uuid ===  1){
	// 	console.log('YEYYY')
	if (parsedBody.uuid == 123){
		context.response.status = 200
		context.response.body = {msg: 'plm'}
	}

//	const result = await setParcelStatus(context, data, authorised)
//	console.log(result)
//	const parcels = await getParcelsAccepted(authorised)

	}
)



// Courier delivered parcel input page 
router.get('/home-courier-receiver-details/:uuid', async context => {
	console.log('/GET /home-courier-receiver-details/:uuid')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised === undefined || permission !== 'courier') context.response.redirect('/login')
	const uuid = context.params.uuid
	const body = await handle.renderView('home-courier-receiver-details', {uuid, authorised})
	context.response.body = body
})


// // Courier POST transit page 
router.post('/home-courier-receiver-details/:uuid', async context => {
	console.log('/POST /home-courier-receiver-details')
	const uuid = context.params.uuid
	let body = context.request.body({type: 'form-data'})
	let data = await body.value.read()
	console.log("THE DATA FROM POST IS:",data)
	// const alert = 
	await setParcelStatusDelivered(uuid, data)
	// body = await handle.renderView('home-courier-receiver-details', {uuid, alert })
	// context.response.body = body
	context.response.redirect('/home-courier-transit')
})


// Courier home page 
router.get('/home-courier-delivered', async context => {
	console.log('/GET /home-courier-p')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'courier' && permission !== 'admin'
	if (authorised === undefined || role) context.response.redirect('/login')
	const parcels = await getParcelsDelivered()
	// console.log(parcels)
	const data = { authorised, parcels }
	const body = await handle.renderView('home-courier-delivered', data)
	context.response.body = body
})


// Customer home page
router.get('/home-customer', async context => {
	console.log('GET /home-customer')	
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised === undefined || permission !== 'customer') context.response.redirect('/login')
	const parcels = await getParcelsCustomer(authorised)
	const data = { authorised, parcels }
	const body = await handle.renderView('home-customer', data)
	context.response.body = body
})

// Customer send parcel page
router.get('/send', async context => {
	console.log('GET /send')	
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised === undefined || permission !== 'customer') context.response.redirect('/login')
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
	const bodys = await handle.renderView('send')
	context.response.body = bodys
	// context.response.redirect('/home-customer')
})


// Individual Parcel page 
router.get('/parcel/:uuid', async context => {
	console.log('/GET /parcel/:uuid')
	const uuid = context.params.uuid
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised === undefined) context.response.redirect('/login')
	const role = { customer : permission === 'customer', 
				  courier : permission === 'courier',
				  admin : permission === 'admin'}
	const parcels = await getParcelDetails(uuid)
	// console.log(parcels)
	const data = { authorised, role, parcels }
	const body = await handle.renderView('parcel', data)
	context.response.body = body
})


export default router
