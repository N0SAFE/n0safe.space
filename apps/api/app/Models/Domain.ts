import { DateTime } from 'luxon'
import { BaseModel, HasOne, ManyToMany, column, hasOne, manyToMany } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'
import User from './User'

export default class Domain extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Project, {
    foreignKey: 'domainId',
  })
  public project: HasOne<typeof Project>

  @column()
  public identifier: string

  @column()
  public status: number

  @manyToMany(() => User, {
    localKey: 'id',
    pivotForeignKey: 'domain_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'user_id',
    pivotTable: 'user_domain_links',
  })
  public owners: ManyToMany<typeof User>
}
