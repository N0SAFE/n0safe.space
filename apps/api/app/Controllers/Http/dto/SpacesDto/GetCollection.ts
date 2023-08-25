import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class SpacesRessourceGetCollectionBodyDto extends BaseDto {}

export class SpacesRessourceGetCollectionQueryDto extends BaseDto {}

export class SpacesRessourceGetCollectionDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourceGetCollectionBodyDto)
  private _body: SpacesRessourceGetCollectionBodyDto = new SpacesRessourceGetCollectionBodyDto({})

  public get body (): SpacesRessourceGetCollectionBodyDto {
    return this._body || new SpacesRessourceGetCollectionBodyDto({})
  }

  public set body (value: SpacesRessourceGetCollectionBodyDto | undefined) {
    this._body = new SpacesRessourceGetCollectionBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourceGetCollectionQueryDto)
  private _query: SpacesRessourceGetCollectionQueryDto = new SpacesRessourceGetCollectionQueryDto(
      {}
    )

  public get query (): SpacesRessourceGetCollectionQueryDto {
    return this._query || new SpacesRessourceGetCollectionQueryDto({})
  }

  public set query (value: SpacesRessourceGetCollectionQueryDto | undefined) {
    this._query = new SpacesRessourceGetCollectionQueryDto(value || {})
  }
}
