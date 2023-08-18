type BaseErrorParameters = {
    docsPath?: string
    docsSlug?: string
    metaMessages?: string[]
  } & (
    | {
        cause?: never
        details?: string
      }
    | {
        cause: BaseError | Error
        details?: never
      }
  )
  
  export class BaseError extends Error {
    details: string
    docsPath?: string
    metaMessages?: string[]
    shortMessage: string
  
    override name = 'InkError'
    version = '0.0.1'
  
    constructor(shortMessage: string, args: BaseErrorParameters = {}) {
      super()
  
      const details =
        args.cause instanceof BaseError
          ? args.cause.details
          : args.cause?.message
          ? args.cause.message
          : args.details!
      const docsPath =
        args.cause instanceof BaseError
          ? args.cause.docsPath || args.docsPath
          : args.docsPath
  
      this.message = [
        shortMessage || 'An error occurred.',
        '',
        ...(args.metaMessages ? [...args.metaMessages, ''] : []),
        ...(docsPath
          ? [
              `Docs: https://viem.sh${docsPath}.html${
                args.docsSlug ? `#${args.docsSlug}` : ''
              }`,
            ]
          : []),
        ...(details ? [`Details: ${details}`] : []),
        `Version: ${this.version}`,
      ].join('\n')
  
      if (args.cause) this.cause = args.cause
      this.details = details
      this.docsPath = docsPath
      this.metaMessages = args.metaMessages
      this.shortMessage = shortMessage
    }
  
    walk(fn?: (err: unknown) => boolean) {
      return this.#walk(this, fn)
    }
  
    #walk(err: unknown, fn?: (err: unknown) => boolean): unknown {
      if (fn?.(err)) return err
      if ((err as Error).cause) return this.#walk((err as Error).cause, fn)
      return err
    }
  }

export type ErrorConstructorType = {
        errName:string;
        message:string;
        code?:number;
        extendClass:(any)[]
    
}



  export const CustomErrorConstructor = (errConstructor:ErrorConstructorType) => {

    const {errName, code, message, extendClass} = errConstructor;


    return class CustomError extends extendClass[0] {
        name = errName;
    
        constructor(cause: Error) {
            super(cause, {
                code,
                message
            })
        }
    }
    
}

