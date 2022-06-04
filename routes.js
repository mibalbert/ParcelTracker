
/* routes.js */

// import { yey } from './publi/util.js'

import { Router } from 'oak'
import { Handlebars } from 'handlebars'

import { login, register } from 'accounts'
import { addParcel } from './modules/send.js'
import { getParcels,  getParcelsCustomer, getParcelsAccepted, setParcelStatus } from './modules/retrieve.js'

const handle = new Handlebars({ defaultLayout: '' })

// const session = new Session();
const router = new Router()


// the routes defined here
// Main homepage - describes the project
router.get('/', async context => {
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = { customer : permission == 'customer', 
				  courier : permission == 'courier',
				  admin : permission == 'admin'}
	const data = { authorised, role }
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
	console.log('/GET /home-courier')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'courier' && permission !== 'admin'
	if (authorised == undefined || role) context.response.redirect('/login')
	const parcels = await getParcels()
	const data = { authorised, parcels }
	const body = await handle.renderView('home-courier', data)
	context.response.body = body
})


// Courier transit page 
router.get('/home-courier-transit', async context => {
	console.log('/GET /home-courier-transit')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	const role = permission !== 'courier' && permission !== 'admin'
	if (authorised == undefined || role) context.response.redirect('/login')
	const parcels = await getParcelsAccepted()
	const data = { authorised, parcels }    
	const body = await handle.renderView('home-courier-transit', data)
	context.response.body = body
})

// Courier POST transit page 
router.post('/home-courier-transit', async context => {
	// console.log('/POST /home-courier-transit')
	const body = context.request.body({type: 'form-data'})
	const data = await body.value.read()
	// const body = await context.request.body()
	// const data = await body.value.read()
	// const result = await setParcelStatus(data)
	// console.log(result)
	console.log(data)
	const parcels = await getParcelsAccepted()
	const datas = { alert: data.fields.search, parcels }    
	const bodys = await handle.renderView('home-courier-transit', datas)
	context.response.body = bodys
	}
)

// Courier delivered parcel input page 
router.get('/home-courier-receiver-details', async context => {
	console.log('/GET /home-courier-receiver-details')
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised == undefined || permission !== 'courier') context.response.redirect('/login')
	// const parcels = await getParcelsAccepted()
	// const data = { authorised, parcels}
	const body = await handle.renderView('home-courier-receiver-details')
	context.response.body = body
})

// Courier POST transit page 
router.post('/home-courier-receiver-details', async context => {
	console.log('/POST /home-courier-receiver-details')
	const body = context.request.body({type: 'form-data'})
	const data = await body.value.read()
	// await setParcelStatus(data)
	context.response.redirect('/home-courier-transit')
})


// Customer home page
router.get('/home-customer', async context => {
	console.log('GET /home-customer')	
	const authorised = await context.cookies.get('authorised')
	const permission = await context.cookies.get('permission')
	if (authorised == undefined || permission !== 'customer') context.response.redirect('/login')
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
	if (authorised == undefined || permission !== 'customer') context.response.redirect('/login')
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
	context.response.redirect('/home-customer')
})



export default router
