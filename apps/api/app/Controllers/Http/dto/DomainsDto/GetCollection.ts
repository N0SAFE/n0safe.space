import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class DomainsRessourceGetCollectionBodyDto extends BaseDto {}

export class DomainsRessourceGetCollectionQueryDto extends BaseDto {}

export class DomainsRessourceGetCollectionDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourceGetCollectionBodyDto)
  private _body: DomainsRessourceGetCollectionBodyDto = new DomainsRessourceGetCollectionBodyDto({})

  public get body (): DomainsRessourceGetCollectionBodyDto {
    return this._body || new DomainsRessourceGetCollectionBodyDto({})
  }

  public set body (value: DomainsRessourceGetCollectionBodyDto | undefined) {
    this._body = new DomainsRessourceGetCollectionBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourceGetCollectionQueryDto)
  private _query: DomainsRessourceGetCollectionQueryDto = new DomainsRessourceGetCollectionQueryDto(
      {}
    )

  public get query (): DomainsRessourceGetCollectionQueryDto {
    return this._query || new DomainsRessourceGetCollectionQueryDto({})
  }

  public set query (value: DomainsRessourceGetCollectionQueryDto | undefined) {
    this._query = new DomainsRessourceGetCollectionQueryDto(value || {})
  }
}
