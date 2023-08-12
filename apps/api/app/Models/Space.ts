import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'

export default class Space extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @column()
  public identifier: string

  @column()
  public description: string

  @column()
  public isPublic: boolean

  @column()
  public isAdmin: boolean

  @column()
  public isArchived: boolean

  @column()
  public isDeleted: boolean

  @column()
  public ownerId: number

  @column()
  public teamId: number

  @belongsTo(() => User, {
    foreignKey: 'ownerId',
  })
  public owner: BelongsTo<typeof User>
}
