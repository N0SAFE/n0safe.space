import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'

export default class AuthController {
  public async login({ request, auth }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')
    
    const user = await Database.from('users').where('email', email).first()
    
    if (!user) {
      return { error: 401, message: 'invalid credentials'}
    }

    try {
      const token = await auth.use('jwt').attempt(user.id, password)
      return token.toJSON()
    } catch (error) {
      return { error: 401, message: 'invalid credentials'}
    }
  }

  public async logout({ auth }) {
    await auth.use('jwt').logout()
    return { success: true }
  }

  public async register() {
    // return not implemented
    return { error: 404, message: 'Not implemented' }
  }

  public async refresh({ auth, request }: HttpContextContract) {
    const refreshToken = request.input('refresh_token')
    const jwt = await auth.use('jwt').loginViaRefreshToken(refreshToken)
    return jwt.toJSON()
  }
}
