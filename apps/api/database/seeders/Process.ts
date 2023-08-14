import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Process from 'App/Models/Process'

export default class extends BaseSeeder {
  public async run() {
    await Process.createMany([
      {
        command: ['node', 'ace', 'serve'],
      },
      {
        command: ['cd api'],
      },
    ])
  }
}
