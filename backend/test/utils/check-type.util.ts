export const isObject = (fn: any): fn is object =>
  !isNullOrUndefined(fn) && typeof fn === 'object';


const isNullOrUndefined = (val: any): val is null | undefined =>
typeof val === 'undefined' || val === null;


export const isString = (val: any): val is string => typeof val === 'string';

export const isFunction = (val: any): val is Function =>
  typeof val === 'function';

  export const isBigInt = (val:any): val is bigint => typeof val === 'bigint';