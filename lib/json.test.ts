import { JSONUtil, stringifyNoCircle } from './json'

test('stringify', () => {
  type A = {
    x: number
    obj: undefined | A
    y: null
  }
  const a: A = {
    x: 1,
    obj: undefined,
    y: null,
  }
  console.log(`a json: ${JSONUtil.stringify(a)}`)
  a.obj = a
  try {
    const aJSON = JSON.stringify(a)
    console.log(`a json: ${aJSON}`)
  } catch (e) {
    expect(e !== undefined && e !== null).toBe(true)
  }
  try {
    const str = stringifyNoCircle(a)
    console.log(str)
  } catch (e) {
    throw e
  }
})

test('JSONUtil', () => {
  const obj = {
    a: 1,
    f: function () {
      return 'f'
    },
    c: () => {
      return 'c'
    },
  }
  const objStr = JSONUtil.stringify(obj)
  console.log(objStr)
  const objValue = JSONUtil.parse(objStr)
  const fValue = objValue.f()
  const cValue = objValue.c()
  expect(fValue).toBe('f')
  expect(cValue).toBe('c')
})
