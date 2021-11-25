/**
 * async sleep
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
