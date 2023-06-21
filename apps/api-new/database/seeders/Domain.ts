import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Domain from 'App/Models/Domain'

export default class extends BaseSeeder {
  public async run() {
    return await Domain.createMany([
      {
        status: 1,
        identifier: 'http://localhost:3333',
      },
    ])
  }
}
