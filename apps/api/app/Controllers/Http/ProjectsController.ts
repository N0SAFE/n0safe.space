import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Project from '../../Models/Project'
import { ProjectsRessourcePostDto } from './dto/ProjectsDto/Post'
import { ProjectsRessourcePatchBodyDto } from './dto/ProjectsDto/Patch'

export default class ProjectsController {
  public async index({}: HttpContextContract) {
    return Project.query().preload('domain').preload('processes')
  }

  public async store({ request, response }: HttpContextContract) {
    const dto = new ProjectsRessourcePostDto({ body: request.body(), query: request.qs() })
    const error = await dto.validate()
    if (error.length > 0) {
      return response.badRequest(error)
    }

    const { body } = dto

    const project = await Project.create(body, { allowExtraProperties: true })
    await project.related('processes').sync(body.processesId || [])

    await project.load((projectQuery) => {
      projectQuery.preload('processes')
      projectQuery.preload('domain')
    })

    return response.ok(project)
  }

  public async show({}: HttpContextContract) {}

  public async edit({}: HttpContextContract) {}

  public async update({ request, response }: HttpContextContract) {
    const body = new ProjectsRessourcePatchBodyDto(request.body())
    const error = await body.validate()
    if (error.length > 0) {
      return response.badRequest(error)
    }

    const id = request.param('id')

    const project = await Project.findOrFail(id)
    await (await project.merge(body).save()).related('processes').sync(body.processesId || [])

    await project.load((projectQuery) => {
      projectQuery.preload('processes')
      projectQuery.preload('domain')
    })

    return response.ok(project)
  }

  public async destroy({ request }: HttpContextContract) {
    try {
      const id = request.param('id')
      const project = await Project.findOrFail(id)
      await project.delete()
    } catch (e) {
      return { message: 'Project not found', success: false }
    }

    return { message: 'Project deleted', success: true }
  }
}
