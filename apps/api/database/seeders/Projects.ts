import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Project from 'App/Models/Project'

export default class extends BaseSeeder {
  public async run () {
    await Project.createMany([
      {
        domainId: 1,
      },
    ])
  }
}
