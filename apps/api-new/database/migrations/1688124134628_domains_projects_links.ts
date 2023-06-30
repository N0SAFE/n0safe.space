import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected domainsTable = 'domains'
  protected projectsTable = 'projects'

  public async up() {
    // this.schema.alterTable(this.domainsTable, (table) => {
    //   table
    //     .integer('project_id')
    //     .unsigned()
    //     .references('id')
    //     .inTable('processes')
    //     .onDelete('CASCADE')
    // })

    this.schema.alterTable(this.projectsTable, (table) => {
      table.integer('domain_id').unsigned().references('id').inTable('domains').onDelete('CASCADE')
    })
  }

  public async down() {
    // this.schema.alterTable(this.domainsTable, (table) => {
    //   table.dropForeign(['project_id'])
    // })

    this.schema.alterTable(this.projectsTable, (table) => {
      table.dropForeign(['domain_id'])
    })
  }
}
