import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class SpacesRessourceDeleteBodyDto extends BaseDto {}

export class SpacesRessourceDeleteQueryDto extends BaseDto {}

export class SpacesRessourceDeleteDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourceDeleteBodyDto)
  private _body: SpacesRessourceDeleteBodyDto = new SpacesRessourceDeleteBodyDto({})

  public get body (): SpacesRessourceDeleteBodyDto {
    return this._body || new SpacesRessourceDeleteBodyDto({})
  }

  public set body (value: SpacesRessourceDeleteBodyDto | undefined) {
    this._body = new SpacesRessourceDeleteBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourceDeleteQueryDto)
  private _query: SpacesRessourceDeleteQueryDto = new SpacesRessourceDeleteQueryDto({})

  public get query (): SpacesRessourceDeleteQueryDto {
    return this._query || new SpacesRessourceDeleteQueryDto({})
  }

  public set query (value: SpacesRessourceDeleteQueryDto | undefined) {
    this._query = new SpacesRessourceDeleteQueryDto(value || {})
  }
}
