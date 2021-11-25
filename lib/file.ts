/**
 * async sleep
 * @deprecated
 * @param {number} timeout
 * @return {Promise<void>}
 */
export const sleep = async (timeout: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timeout)
  })
}

/**
 * download file which is Uint8Array
 * @param {Uint8Array[]} data
 * @param {string} filename
 * @param {string} type
 */
export const download = (
  data: Uint8Array[],
  filename: string,
  type: string
) => {
  const file = new Blob(
    data.map((item) => item.buffer),
    { type }
  )
  const a = document.createElement('a')
  a.href = URL.createObjectURL(file)
  a.download = filename
  a.click()
  a.remove()
}
