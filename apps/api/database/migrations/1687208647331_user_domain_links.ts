import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected userDomainLinksTable = 'user_domain_links'

  public async up () {
    this.schema.createTable(this.userDomainLinksTable, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('domain_id').unsigned().references('id').inTable('domains').onDelete('CASCADE')
    })
  }

  public async down () {
    this.schema.dropTable(this.userDomainLinksTable)
  }
}
