import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  manyToMany,
  ManyToMany,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { compose } from '@ioc:Adonis/Core/Helpers'
import { SoftDeletes } from '@ioc:Adonis/Addons/LucidSoftDeletes'
import Domain from 'App/Models/Domain'
import Space from 'App/Models/Space'

export default class User extends compose(BaseModel, SoftDeletes) {
  @column({ isPrimary: true })
  public id: number

  @column({
    serialize: (value) => value.toLowerCase(),
  })
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @column.dateTime() // @ts-ignore
  public deletedAt?: DateTime | null

  @manyToMany(() => Domain, {
    localKey: 'id',
    pivotForeignKey: 'user_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'domain_id',
    pivotTable: 'user_domain_links',
  })
  public domains: ManyToMany<typeof Domain>

  @column()
  public picture: string

  @hasMany(() => Space, {
    foreignKey: 'ownerId',
  })
  public spaces: HasMany<typeof Space>
}
