import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Process from 'App/Models/Process'

export default class extends BaseSeeder {
  public async run () {
    await Process.createMany([
      {
        command: ['node', 'ace', 'serve'],
        domainId: 1,
      },
      {
        command: ['cd api'],
      },
    ])
  }
}
