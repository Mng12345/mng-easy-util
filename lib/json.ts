export const stringifyNoCircle = (obj: any): string => {
  let cache: WeakSet<object> | null = new WeakSet()
  const str = JSON.stringify(obj, (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (cache!.has(value)) {
        return
      }
      cache!.add(value)
      return value
    } else if (typeof value === 'function') {
      if (cache!.has(value)) {
        return
      }
      cache!.add(value)
      const fStr = value.toString()
      if (fStr.indexOf('function') === 0) {
        return value.toString()
      } else {
        return `function(...args) {
          const fStr = \`${fStr}\`
          const f = eval(\`(\${fStr})\`)
          return f(...args)
        }`
      }
    }
    return value
  })
  cache = null
  return str
}

export const parse = (object: any): any => {
  return JSON.parse(object, (key: string, v: any) => {
    if (typeof v === 'string' && v.indexOf('function') === 0) {
      return eval(`(${v})`)
    }
    return v
  })
}

export class JSONUtil {
  static stringify = stringifyNoCircle
  static parse = parse
}
