import {
  IsDefined,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  ValidateNested,
} from 'class-validator'
import { BaseDto } from '../BaseDto'
import Domain from 'App/Models/Domain'
import Process from 'App/Models/Process'
import { Type } from 'class-transformer'
import { EntityExist } from '../Decorator/EntityExist'

export class ProjectsRessourcePostBodyDto extends BaseDto {
  @IsNumber()
  @IsNotEmpty()
  @IsOptional()
  @EntityExist(Domain)
  public domainId: number

  @IsNumber({}, { each: true })
  @IsOptional()
  @EntityExist(Process)
  public processesId: number[]
}

export class ProjectsRessourcePostQueryDto extends BaseDto {}

export class ProjectsRessourcePostDto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourcePostBodyDto)
  private _body: ProjectsRessourcePostBodyDto = new ProjectsRessourcePostBodyDto({})

  public get body(): ProjectsRessourcePostBodyDto {
    return this._body || new ProjectsRessourcePostBodyDto({})
  }

  public set body(value: ProjectsRessourcePostBodyDto | undefined) {
    this._body = new ProjectsRessourcePostBodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ProjectsRessourcePostQueryDto)
  private _query: ProjectsRessourcePostQueryDto = new ProjectsRessourcePostQueryDto({})

  public get query(): ProjectsRessourcePostQueryDto {
    return this._query || new ProjectsRessourcePostQueryDto({})
  }

  public set query(value: ProjectsRessourcePostQueryDto | undefined) {
    this._query = new ProjectsRessourcePostQueryDto(value || {})
  }
}
