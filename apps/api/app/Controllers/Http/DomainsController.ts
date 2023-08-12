import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Domain from '../../Models/Domain'

export default class DomainsController {
  public async index ({}: HttpContextContract) {
    return Domain.query().preload('project', (projectQuery) => {
      // preload project for each domain (look at the Domain model)
      projectQuery.preload('processes').preload('domain', (domainQuery) => {
        // preload domain for each project (look at the Project model) (loop back to the Domain model)
        domainQuery.preload('project')
      })
    })
  }

  public async create ({}: HttpContextContract) {}

  public async store ({}: HttpContextContract) {}

  public async show ({}: HttpContextContract) {}

  public async edit ({}: HttpContextContract) {}

  public async update ({}: HttpContextContract) {}

  public async destroy ({}: HttpContextContract) {}
}
