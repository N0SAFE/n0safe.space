import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { SpacesRessourcePostDto } from './dto/SpacesDto/Post'
import Space from 'App/Models/Space'
import User from 'App/Models/User'

export default class SpacesController {
  public async index({}: HttpContextContract) {
    return Space.all()
  }

  public async create({ request, response }: HttpContextContract) {
    const dto = new SpacesRessourcePostDto({ body: request.body(), query: request.qs() })
    const error = await dto.validate()
    if (error.length > 0) {
      return response.badRequest(error)
    }

    const { body } = dto

    const space = await Space.create(body, { allowExtraProperties: true })
    await space.load('owner')

    return response.ok(space)
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const dto = new SpacesRessourcePostDto({
      body: { ...request.body(), teamId: 1 /** temp value */ },
      query: request.qs(),
    })
    const error = await dto.validate()
    if (error.length > 0) {
      return response.badRequest(error)
    }

    const { body } = dto

    const space = await Space.create(body, { allowExtraProperties: true })
    await space.related('owner').associate(auth.use('jwt').user as User)
    await space.load('owner')

    return response.ok(space)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
