import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class DomainsRessourcePatchBodyDto extends BaseDto {}

export class DomainsRessourcePatchQueryDto extends BaseDto {}

export class DomainsRessourcePatchDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourcePatchBodyDto)
  private _body: DomainsRessourcePatchBodyDto = new DomainsRessourcePatchBodyDto({})

  public get body(): DomainsRessourcePatchBodyDto {
    return this._body || new DomainsRessourcePatchBodyDto({})
  }

  public set body(value: DomainsRessourcePatchBodyDto | undefined) {
    this._body = new DomainsRessourcePatchBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourcePatchQueryDto)
  private _query: DomainsRessourcePatchQueryDto = new DomainsRessourcePatchQueryDto({})

  public get query(): DomainsRessourcePatchQueryDto {
    return this._query || new DomainsRessourcePatchQueryDto({})
  }

  public set query(value: DomainsRessourcePatchQueryDto | undefined) {
    this._query = new DomainsRessourcePatchQueryDto(value || {})
  }
}
