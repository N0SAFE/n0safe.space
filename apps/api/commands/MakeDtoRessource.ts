import { BaseCommand, args, flags } from '@adonisjs/core/build/standalone'
import fs from 'fs'
import { resolve } from 'path'

export default class MakeDtoRessource extends BaseCommand {
  /**
   * Command name is used to run the command
   */
  public static commandName = 'make:dto:ressource'

  @flags.boolean({ alias: 'F', description: 'force to rewrite the file' })
  public force: boolean

  @args.string({ description: 'Name of the ressource' })
  public name: string

  @flags.string({ alias: 'L', description: 'Location of the Dto' })
  public location: string = this.application.resolveNamespaceDirectory('httpControllers')!

  /**
   * Command description is displayed in the "help" output
   */
  public static description = 'Make dto file for a controller ressource with all methods'

  public static settings = {
    /**
     * Set the following value to true, if you want to load the application
     * before running the command. Don't forget to call `node ace generate:manifest`
     * afterwards.
     */
    loadApp: false,

    /**
     * Set the following value to true, if you want this command to keep running until
     * you manually decide to exit the process. Don't forget to call
     * `node ace generate:manifest` afterwards.
     */
    stayAlive: false,
  }

  public methodList: string[] = ['Delete', 'Get', 'GetCollection', 'Patch', 'Post', 'Put']

  public fileTemplate (method) {
    const tempName = this.name.replace(/Controller$/, '').replace(/Dto$/, '')
    const name = tempName.charAt(0).toUpperCase() + tempName.slice(1)
    return fileTemplate(name, method)
  }

  public baseDtoTemplate () {
    return baseDtoTemplate()
  }

  public entityExistDecoratorTemplate () {
    return entityExistDecoratorTemplate()
  }

  public async run () {
    const appRoot = this.application.appRoot
    const dtoDir = resolve(appRoot, this.location, 'dto')
    const relativeDtoDir = resolve(
      this.application.resolveNamespaceDirectory('httpControllers')!,
      'dto'
    )

    if (!fs.existsSync(dtoDir)) {
      fs.mkdirSync(dtoDir)
      this.logger.action('create dir').succeeded(relativeDtoDir)
    }

    if (!fs.existsSync(resolve(dtoDir, 'BaseDto.ts'))) {
      fs.writeFileSync(resolve(dtoDir, 'BaseDto.ts'), this.baseDtoTemplate())
      this.logger.action('create file').succeeded(resolve(relativeDtoDir, 'BaseDto.ts'))
    } else {
      this.logger.action('create file').skipped(resolve(relativeDtoDir, 'BaseDto.ts'))
    }

    if (!fs.existsSync(resolve(dtoDir, 'Decorator'))) {
      fs.mkdirSync(resolve(dtoDir, 'Decorator'))
      this.logger.action('create dir').succeeded(resolve(relativeDtoDir, 'Decorator'))
    } else {
      this.logger.action('create dir').skipped(resolve(relativeDtoDir, 'Decorator'))
    }

    if (!fs.existsSync(resolve(dtoDir, 'Decorator', 'EntityExist.ts'))) {
      fs.writeFileSync(
        resolve(dtoDir, 'Decorator', 'EntityExist.ts'),
        this.entityExistDecoratorTemplate()
      )
      this.logger
        .action('create file')
        .succeeded(resolve(relativeDtoDir, 'Decorator', 'EntityExist.ts'))
    } else {
      this.logger
        .action('create file')
        .skipped(resolve(relativeDtoDir, 'Decorator', 'EntityExist.ts'))
    }

    const tempDtoDirName = this.name.replace(/Controller$/, '').replace(/Dto$/, '') + 'Dto'
    const dtoDirName = tempDtoDirName.charAt(0).toUpperCase() + tempDtoDirName.slice(1)
    if (this.force || !fs.existsSync(resolve(dtoDir, dtoDirName))) {
      if (this.force) {
        fs.rmdirSync(resolve(dtoDir, dtoDirName), { recursive: true })
      }
      fs.mkdirSync(resolve(dtoDir, dtoDirName))
      this.logger.action('create dir').succeeded(resolve(relativeDtoDir, dtoDirName))
    } else {
      this.logger.action('create dir').failed(resolve(relativeDtoDir, dtoDirName), 'already exist')
      return false
    }

    this.methodList.forEach((method) => {
      if (this.force || !fs.existsSync(resolve(dtoDir, dtoDirName, method + '.ts'))) {
        fs.writeFileSync(resolve(dtoDir, dtoDirName, method + '.ts'), this.fileTemplate(method))
        this.logger
          .action('create file')
          .succeeded(resolve(relativeDtoDir, dtoDirName, method + '.ts'))
      } else {
        this.logger
          .action('create file')
          .skipped(resolve(relativeDtoDir, dtoDirName, method + '.ts'))
      }
    })
  }
}

export function entityExistDecoratorTemplate () {
  return `import { registerDecorator, ValidatorConstraint, ValidationArguments } from 'class-validator'
import { BaseModel } from '@ioc:Adonis/Lucid/Orm'

@ValidatorConstraint({ async: true })
export class EntityExistConstraint {
  public async validate(value: number | number[], args: ValidationArguments) {
    const [relatedModel] = args.constraints
    if (!Array.isArray(value)) {
      value = [value]
    }
    const relatedModelInstance = await relatedModel.findMany(value)
    return relatedModelInstance.length === value.length
  }
}

export function EntityExist(model: typeof BaseModel) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'entityExist',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [model],
      options: {
        message: (validationArguments) => {
          if (!Array.isArray(validationArguments.value)) {
            return \`the instance of \${model.name} with id \${validationArguments.value} does not exist\`
          }
          return \`one of the instance of \${model.name} with ids [\${validationArguments.value.join(
            ', '
          )}] does not exist\`
        },
      },
      validator: EntityExistConstraint,
    })
  }
}
`
}

export function baseDtoTemplate () {
  return `import { validate } from 'class-validator'

export class BaseDto {
  constructor(args) {
    // assign all args to this but only if they are defined and create a new instance to the nested object if the type as to be BaseDto
    if (!args) {
      return
    }
    if (typeof args !== 'object') {
      throw new Error('default argument of a BaseDto instance must be an object')
    }
    Object.keys(args).forEach((key) => {
      if (args[key] && typeof args[key] === 'object' && args[key].constructor === Object) {
        // @ts-ignore
        this[key] = new this.constructor(args[key])
      } else {
        this[key] = args[key]
      }
    })
  }

  public async validate() {
    return await validate(this, { whitelist: true, forbidUnknownValues: false })
  }
}
`
}

export function fileTemplate (name, method) {
  return `import {
  IsDefined,
  IsObject,
  ValidateNested,
} from 'class-validator'
import { BaseDto } from '../BaseDto'
import { Type } from 'class-transformer'

export class ${name}Ressource${method}BodyDto extends BaseDto {}

export class ${name}Ressource${method}QueryDto extends BaseDto {}

export class ${name}Ressource${method}Dto extends BaseDto {
  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ${name}Ressource${method}BodyDto)
  private _body: ${name}Ressource${method}BodyDto = new ${name}Ressource${method}BodyDto({})

  public get body(): ${name}Ressource${method}BodyDto {
    return this._body || new ${name}Ressource${method}BodyDto({})
  }

  public set body(value: ${name}Ressource${method}BodyDto | undefined) {
    this._body = new ${name}Ressource${method}BodyDto(value || {})
  }

  @IsDefined()
  @IsObject()
  @ValidateNested()
  @Type(() => ${name}Ressource${method}QueryDto)
  private _query: ${name}Ressource${method}QueryDto = new ${name}Ressource${method}QueryDto({})

  public get query(): ${name}Ressource${method}QueryDto {
    return this._query || new ${name}Ressource${method}QueryDto({})
  }

  public set query(value: ${name}Ressource${method}QueryDto | undefined) {
    this._query = new ${name}Ressource${method}QueryDto(value || {})
  }
}
`
}
