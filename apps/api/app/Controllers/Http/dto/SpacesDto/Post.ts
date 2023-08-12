import {
  IsBoolean,
  IsDefined,
  IsInt,
  IsObject,
  IsString,
  ValidateIf,
  ValidateNested,
} from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class SpacesRessourcePostBodyDto extends BaseDto {
  @IsDefined()
  @IsString()
  public identifier: string

  @IsDefined()
  @IsString()
  public description: string

  @IsDefined()
  @IsBoolean()
  @ValidateIf((o) => o.isAdmin !== true)
  public isPublic = true

  @IsDefined()
  @IsBoolean()
  @ValidateIf((o) => o.isPublic !== true)
  public isAdmin = false

  @IsDefined()
  @IsBoolean()
  public isArchived = false

  @IsDefined()
  @IsBoolean()
  public isDeleted = false

  @IsDefined()
  @IsInt()
  public teamId: number
}

export class SpacesRessourcePostQueryDto extends BaseDto {}

export class SpacesRessourcePostDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourcePostBodyDto)
  private _body: SpacesRessourcePostBodyDto = new SpacesRessourcePostBodyDto({})

  public get body (): SpacesRessourcePostBodyDto {
    return this._body || new SpacesRessourcePostBodyDto({})
  }

  public set body (value: SpacesRessourcePostBodyDto | undefined) {
    this._body = new SpacesRessourcePostBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => SpacesRessourcePostQueryDto)
  private _query: SpacesRessourcePostQueryDto = new SpacesRessourcePostQueryDto({})

  public get query (): SpacesRessourcePostQueryDto {
    return this._query || new SpacesRessourcePostQueryDto({})
  }

  public set query (value: SpacesRessourcePostQueryDto | undefined) {
    this._query = new SpacesRessourcePostQueryDto(value || {})
  }
}
