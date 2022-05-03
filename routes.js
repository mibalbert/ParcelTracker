
/* routes.js */

import { Router } from 'oak'
import { Handlebars } from 'handlebars'

import { login, register } from 'accounts'

const handle = new Handlebars({ defaultLayout: '' })

const router = new Router()

// the routes defined here
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
  context.response.redirect('/')
})

router.post('/login', async context => {
	console.log('POST /login')
	const body = context.request.body({ type: 'form' })
	const value = await body.value
	const obj = Object.fromEntries(value)
	console.log(obj)
	try {
		const username = await login(obj)
		await context.cookies.set('authorised', username)
		context.response.redirect('/foo')
	} catch(err) {
		console.log(err)
		context.response.redirect('/login')
	}
})

router.get('/foo', async context => {
	const authorised = context.cookies.get('authorised')
	if(authorised === undefined) context.response.redirect('/')
	const data = { authorised }
	const body = await handle.renderView('foo', data)
	context.response.body = body
})

export default router
