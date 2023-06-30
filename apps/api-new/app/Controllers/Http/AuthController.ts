import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'

export default class AuthController {
  public async login({ request, auth, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    if (!email || !password) {
      return response.badRequest({ message: 'missing email or password', success: false })
    }

    const user = await User.query().where('email', email).first()

    if (!user) {
      return response.unauthorized({ message: 'invalid credentials', success: false })
    }

    try {
      const jwt = await auth.use('jwt').attempt(`${user.id}`, password)
      return response.ok({ ...jwt.toJSON(), success: true })
    } catch (error) {
      return response.unauthorized({ message: 'invalid credentials', success: false })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    if (!auth.use('jwt').user) {
      return response.unauthorized({ message: 'no credentials provided', success: false })
    }
    try {
      await auth.use('jwt').logout()
    } catch (error) {
      return response.badRequest({ message: 'unable to logout', success: false })
    }
    return response.ok({ message: 'logged out', success: true })
  }

  public async register({ auth, request, response }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    if (!email || !password) {
      return response.badRequest({ message: 'missing email or password', success: false })
    }

    const userExists = await Database.from('users').where('email', email).first()

    if (userExists) {
      return response.unauthorized({ message: 'user already exists', success: false })
    }

    const user = await User.create({
      email,
      password,
    })

    const jwt = await auth.use('jwt').login(user)
    return response.created({ ...jwt.toJSON(), success: true })
  }

  public async refresh({ auth, request, response }: HttpContextContract) {
    const refreshToken = request.input('refresh_token')
    if (!refreshToken) {
      return response.unauthorized({ message: 'no refresh token provided', success: false })
    }
    try {
      const jwt = await auth.use('jwt').loginViaRefreshToken(refreshToken)
      return response.ok({ ...jwt.toJSON(), success: true })
    } catch (error) {
      return response.unauthorized({ message: 'invalid refresh token', success: false })
    }
  }

  public async whoami({ auth, response }: HttpContextContract) {
    return response.ok({
      user: auth.use('jwt').user,
      payload: auth.use('jwt').payload,
      isLoggedIn: auth.use('jwt').isAuthenticated,
    })
  }
}
