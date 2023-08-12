import { validate } from 'class-validator'

export class BaseDto {
  constructor (args) {
    /**
     * assign all args to this but only if they are defined
     * create a new instance to the nested object if the type as to be BaseDto
    */
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

  public async validate () {
    return await validate(this, { whitelist: true, forbidUnknownValues: false })
  }
}
