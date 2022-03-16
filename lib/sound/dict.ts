export namespace SoundDict {
  type DictKey = number | string | symbol

  type Dict<V> = {
    [index: number | string | symbol]: V
  }
  export function get<K extends DictKey, V>(
    dict: Dict<V>,
    index: K
  ): V | undefined {
    return dict[index]
  }
}
