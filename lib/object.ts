export const mapObject = <T>(
  obj: Object,
  extractor: (key: string) => T
): T[] => {
  const keys = Object.keys(obj)
  return keys.map(extractor)
}
