import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class DomainsRessourcePostBodyDto extends BaseDto {}

export class DomainsRessourcePostQueryDto extends BaseDto {}

export class DomainsRessourcePostDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourcePostBodyDto)
  private _body: DomainsRessourcePostBodyDto = new DomainsRessourcePostBodyDto({})

  public get body(): DomainsRessourcePostBodyDto {
    return this._body || new DomainsRessourcePostBodyDto({})
  }

  public set body(value: DomainsRessourcePostBodyDto | undefined) {
    this._body = new DomainsRessourcePostBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => DomainsRessourcePostQueryDto)
  private _query: DomainsRessourcePostQueryDto = new DomainsRessourcePostQueryDto({})

  public get query(): DomainsRessourcePostQueryDto {
    return this._query || new DomainsRessourcePostQueryDto({})
  }

  public set query(value: DomainsRessourcePostQueryDto | undefined) {
    this._query = new DomainsRessourcePostQueryDto(value || {})
  }
}
