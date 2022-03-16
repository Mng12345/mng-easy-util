import { SoundTypes } from './types'

export namespace SoundArray {
  export function get<T>(array: T[], index: SoundTypes.int): T {
    if (index >= 0 && index < array.length) {
      return array[index]
    } else {
      throw new Error(`index[${index}] out of bounds.`)
    }
  }
}
