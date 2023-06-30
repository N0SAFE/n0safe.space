import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from '../../Models/Project'

export default class ProjectsController {
  public async index({}: HttpContextContract) {
    return Project.query().preload('domain').preload('processes')
  }

  public async create({}: HttpContextContract) {}

  public async store({}: HttpContextContract) {}

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}
}
