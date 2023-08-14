import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class DomainsRessourceGetBodyDto extends BaseDto {}

export class DomainsRessourceGetQueryDto extends BaseDto {}

export class DomainsRessourceGetDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourceGetBodyDto)
  private _body: DomainsRessourceGetBodyDto = new DomainsRessourceGetBodyDto({})

  public get body(): DomainsRessourceGetBodyDto {
    return this._body || new DomainsRessourceGetBodyDto({})
  }

  public set body(value: DomainsRessourceGetBodyDto | undefined) {
    this._body = new DomainsRessourceGetBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourceGetQueryDto)
  private _query: DomainsRessourceGetQueryDto = new DomainsRessourceGetQueryDto({})

  public get query(): DomainsRessourceGetQueryDto {
    return this._query || new DomainsRessourceGetQueryDto({})
  }

  public set query(value: DomainsRessourceGetQueryDto | undefined) {
    this._query = new DomainsRessourceGetQueryDto(value || {})
  }
}
