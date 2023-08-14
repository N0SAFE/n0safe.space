import { IsDefined, IsObject, ValidateNested } from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ProjectsRessourceGetBodyDto extends BaseDto {}

export class ProjectsRessourceGetQueryDto extends BaseDto {}

export class ProjectsRessourceGetDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourceGetBodyDto)
  private _body: ProjectsRessourceGetBodyDto = new ProjectsRessourceGetBodyDto({})

  public get body(): ProjectsRessourceGetBodyDto {
    return this._body || new ProjectsRessourceGetBodyDto({})
  }

  public set body(value: ProjectsRessourceGetBodyDto | undefined) {
    this._body = new ProjectsRessourceGetBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourceGetQueryDto)
  private _query: ProjectsRessourceGetQueryDto = new ProjectsRessourceGetQueryDto({})

  public get query(): ProjectsRessourceGetQueryDto {
    return this._query || new ProjectsRessourceGetQueryDto({})
  }

  public set query(value: ProjectsRessourceGetQueryDto | undefined) {
    this._query = new ProjectsRessourceGetQueryDto(value || {})
  }
}
