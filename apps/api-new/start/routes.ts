/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import HealthCheck from '@ioc:Adonis/Core/HealthCheck'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

// check db connection
Route.get('health', async ({ response }) => {
  const report = await HealthCheck.getReport()

  return report.healthy ? response.ok(report) : response.badRequest(report)
})

Route.group(() => {
  Route.post('login', 'AuthController.login')
  Route.post('logout', 'AuthController.logout')
  Route.post('register', 'AuthController.register')
  Route.post('refresh', 'AuthController.refresh')
  Route.get('whoami', 'AuthController.whoami')
}).middleware(async ({ auth }, next) => {
  try {
    await auth.use('jwt').authenticate()
  } catch (e) {}
  return await next()
})

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()
  Route.resource('domains', 'DomainsController').apiOnly()
  Route.resource('processes', 'ProcessesController').apiOnly()
  Route.resource('projects', 'ProjectsController').apiOnly()
}).middleware(async ({ auth, response }: HttpContextContract, next) => {
  try {
    await auth.use('jwt').authenticate()
  } catch (e) {
    return response.unauthorized({ error: 401, message: 'invalid credentials' })
  }
  return await next()
})
