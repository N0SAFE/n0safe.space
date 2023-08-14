import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected processProjectLinksTable = 'process_project_links'

  public async up() {
    this.schema.createTable(this.processProjectLinksTable, (table) => {
      table.increments('id')
      table
        .integer('process_id')
        .unsigned()
        .references('id')
        .inTable('processes')
        .onDelete('CASCADE')
      table
        .integer('project_id')
        .unsigned()
        .references('id')
        .inTable('projects')
        .onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTable(this.processProjectLinksTable)
  }
}
