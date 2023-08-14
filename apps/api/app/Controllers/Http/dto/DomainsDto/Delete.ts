import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class DomainsRessourceDeleteBodyDto extends BaseDto {}

export class DomainsRessourceDeleteQueryDto extends BaseDto {}

export class DomainsRessourceDeleteDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourceDeleteBodyDto)
  private _body: DomainsRessourceDeleteBodyDto = new DomainsRessourceDeleteBodyDto({})

  public get body(): DomainsRessourceDeleteBodyDto {
    return this._body || new DomainsRessourceDeleteBodyDto({})
  }

  public set body(value: DomainsRessourceDeleteBodyDto | undefined) {
    this._body = new DomainsRessourceDeleteBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourceDeleteQueryDto)
  private _query: DomainsRessourceDeleteQueryDto = new DomainsRessourceDeleteQueryDto({})

  public get query(): DomainsRessourceDeleteQueryDto {
    return this._query || new DomainsRessourceDeleteQueryDto({})
  }

  public set query(value: DomainsRessourceDeleteQueryDto | undefined) {
    this._query = new DomainsRessourceDeleteQueryDto(value || {})
  }
}
