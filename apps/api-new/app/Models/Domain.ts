import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Project from './Project'

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
}
