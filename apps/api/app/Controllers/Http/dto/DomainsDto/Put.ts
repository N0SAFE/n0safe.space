import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class DomainsRessourcePutBodyDto extends BaseDto {}

export class DomainsRessourcePutQueryDto extends BaseDto {}

export class DomainsRessourcePutDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourcePutBodyDto)
  private _body: DomainsRessourcePutBodyDto = new DomainsRessourcePutBodyDto({})

  public get body(): DomainsRessourcePutBodyDto {
    return this._body || new DomainsRessourcePutBodyDto({})
  }

  public set body(value: DomainsRessourcePutBodyDto | undefined) {
    this._body = new DomainsRessourcePutBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourcePutQueryDto)
  private _query: DomainsRessourcePutQueryDto = new DomainsRessourcePutQueryDto({})

  public get query(): DomainsRessourcePutQueryDto {
    return this._query || new DomainsRessourcePutQueryDto({})
  }

  public set query(value: DomainsRessourcePutQueryDto | undefined) {
    this._query = new DomainsRessourcePutQueryDto(value || {})
  }
}
