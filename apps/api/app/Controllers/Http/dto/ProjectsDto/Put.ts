import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProjectsRessourcePutBodyDto extends BaseDto {}

export class ProjectsRessourcePutQueryDto extends BaseDto {}

export class ProjectsRessourcePutDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourcePutBodyDto)
  private _body: ProjectsRessourcePutBodyDto = new ProjectsRessourcePutBodyDto({})

  public get body (): ProjectsRessourcePutBodyDto {
    return this._body || new ProjectsRessourcePutBodyDto({})
  }

  public set body (value: ProjectsRessourcePutBodyDto | undefined) {
    this._body = new ProjectsRessourcePutBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourcePutQueryDto)
  private _query: ProjectsRessourcePutQueryDto = new ProjectsRessourcePutQueryDto({})

  public get query (): ProjectsRessourcePutQueryDto {
    return this._query || new ProjectsRessourcePutQueryDto({})
  }

  public set query (value: ProjectsRessourcePutQueryDto | undefined) {
    this._query = new ProjectsRessourcePutQueryDto(value || {})
  }
}
