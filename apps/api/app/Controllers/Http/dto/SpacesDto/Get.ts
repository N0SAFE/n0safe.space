import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class SpacesRessourceGetBodyDto extends BaseDto {}

export class SpacesRessourceGetQueryDto extends BaseDto {}

export class SpacesRessourceGetDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourceGetBodyDto)
  private _body: SpacesRessourceGetBodyDto = new SpacesRessourceGetBodyDto({})

  public get body (): SpacesRessourceGetBodyDto {
    return this._body || new SpacesRessourceGetBodyDto({})
  }

  public set body (value: SpacesRessourceGetBodyDto | undefined) {
    this._body = new SpacesRessourceGetBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourceGetQueryDto)
  private _query: SpacesRessourceGetQueryDto = new SpacesRessourceGetQueryDto({})

  public get query (): SpacesRessourceGetQueryDto {
    return this._query || new SpacesRessourceGetQueryDto({})
  }

  public set query (value: SpacesRessourceGetQueryDto | undefined) {
    this._query = new SpacesRessourceGetQueryDto(value || {})
  }
}
