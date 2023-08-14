import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class SpacesRessourcePutBodyDto extends BaseDto {}

export class SpacesRessourcePutQueryDto extends BaseDto {}

export class SpacesRessourcePutDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourcePutBodyDto)
  private _body: SpacesRessourcePutBodyDto = new SpacesRessourcePutBodyDto({})

  public get body(): SpacesRessourcePutBodyDto {
    return this._body || new SpacesRessourcePutBodyDto({})
  }

  public set body(value: SpacesRessourcePutBodyDto | undefined) {
    this._body = new SpacesRessourcePutBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourcePutQueryDto)
  private _query: SpacesRessourcePutQueryDto = new SpacesRessourcePutQueryDto({})

  public get query(): SpacesRessourcePutQueryDto {
    return this._query || new SpacesRessourcePutQueryDto({})
  }

  public set query(value: SpacesRessourcePutQueryDto | undefined) {
    this._query = new SpacesRessourcePutQueryDto(value || {})
  }
}
