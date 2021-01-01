export const stringifyNoCircle = (obj: any): string => {
  let cache: WeakSet<object> | null = new WeakSet()
  const str = JSON.stringify(obj, (key: string, value: any) => {
    if (typeof value === 'object' && value !== null) {
      if (cache!.has(value)) {
        return
      }
      cache!.add(value)
    }
    return value
  })
  cache = null
  return str
}
