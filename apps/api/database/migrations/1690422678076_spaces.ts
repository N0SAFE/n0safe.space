import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'spaces'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.string('identifier').notNullable()
      table.string('description').notNullable()
      table.boolean('is_public').notNullable()
      table.boolean('is_admin').notNullable()
      table.boolean('is_archived').notNullable()
      table.boolean('is_deleted').notNullable()
      table.integer('owner_id').unsigned().references('users.id').onDelete('CASCADE')
      table.integer('team_id')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
