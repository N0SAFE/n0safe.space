import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Domain from '../../Models/Domain'

export default class DomainsController {
  public async index({}: HttpContextContract) {
    return Domain.query().preload('process')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
