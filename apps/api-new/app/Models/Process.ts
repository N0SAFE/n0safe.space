import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Domain from './Domain'

export default class Process extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({serializeAs: null})
  public domainId: number

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
}
