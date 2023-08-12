import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Domain from './Domain'
import Project from './Project'

export default class Process extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column({
    prepare: (value: string[]): string => JSON.stringify(value),
  })
  public command: string[]

  @hasOne(() => Domain)
  public domain: HasOne<typeof Domain>

  @manyToMany(() => Project, {
    localKey: 'id',
    pivotForeignKey: 'process_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'project_id',
    pivotTable: 'process_project_links',
  })
  public projects: ManyToMany<typeof Project>
}
