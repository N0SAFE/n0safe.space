import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected domainsTable = 'domains'
  protected processesTable = 'processes'

  public async up() {
    this.schema.alterTable(this.domainsTable, (table) => {
      table.integer('process_id').unsigned().references('id').inTable('processes').onDelete('CASCADE')
    })

    this.schema.alterTable(this.processesTable, (table) => {
      table.integer('domain_id').unsigned().references('id').inTable('domains').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.alterTable(this.domainsTable, (table) => {
      table.dropForeign(['process_id'])
    })

    this.schema.alterTable(this.processesTable, (table) => {
      table.dropForeign(['domain_id'])
    })
  }
}
