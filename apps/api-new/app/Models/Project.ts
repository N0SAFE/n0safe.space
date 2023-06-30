import { DateTime } from 'luxon'
import {
  BaseModel,
  BelongsTo,
  HasMany,
  ManyToMany,
  belongsTo,
  column,
  hasMany,
  manyToMany,
} from '@ioc:Adonis/Lucid/Orm'
import Process from './Process'
import Domain from './Domain'

export default class Project extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Domain, {
    foreignKey: 'domainId',
  })
  public domain: BelongsTo<typeof Domain>

  @column({ serializeAs: null })
  public domainId: number

  @manyToMany(() => Process, {
    localKey: 'id',
    pivotForeignKey: 'project_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'process_id',
    pivotTable: 'process_project_links',
  })
  public processes: ManyToMany<typeof Process>
}
