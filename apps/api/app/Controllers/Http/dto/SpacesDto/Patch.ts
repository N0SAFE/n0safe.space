import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class SpacesRessourcePatchBodyDto extends BaseDto {}

export class SpacesRessourcePatchQueryDto extends BaseDto {}

export class SpacesRessourcePatchDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourcePatchBodyDto)
  private _body: SpacesRessourcePatchBodyDto = new SpacesRessourcePatchBodyDto({})

  public get body(): SpacesRessourcePatchBodyDto {
    return this._body || new SpacesRessourcePatchBodyDto({})
  }

  public set body(value: SpacesRessourcePatchBodyDto | undefined) {
    this._body = new SpacesRessourcePatchBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourcePatchQueryDto)
  private _query: SpacesRessourcePatchQueryDto = new SpacesRessourcePatchQueryDto({})

  public get query(): SpacesRessourcePatchQueryDto {
    return this._query || new SpacesRessourcePatchQueryDto({})
  }

  public set query(value: SpacesRessourcePatchQueryDto | undefined) {
    this._query = new SpacesRessourcePatchQueryDto(value || {})
  }
}
