import { BaseModelFilter } from '@ioc:Adonis/Addons/LucidFilter'
import { ModelQueryBuilderContract } from '@ioc:Adonis/Lucid/Orm'
import Domain from 'App/Models/Domain'

export default class DomainFilter extends BaseModelFilter {
  public $query: ModelQueryBuilderContract<typeof Domain, Domain>

  // public method (value: any): void {
  //   this.$query.where('name', value)
  // }
  
  public identifier (identifier: string): void {
    this.$query.where('identifier', identifier)
  }
}
