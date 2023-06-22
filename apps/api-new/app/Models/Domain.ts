import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Process from './Process'

export default class Domain extends BaseModel {
  @column({ isPrimary: true })
  public id: number
  
  @column({serializeAs: null})
  public processId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasOne(() => Process)
  public process: HasOne<typeof Process>

  @column()
  public identifier: string

  @column()
  public status: number
}
