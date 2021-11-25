import { match } from './match'

test('match', function () {
  const v1: string | number | boolean = false
  const r1 = match<
    string,
    string,
    number,
    number,
    boolean,
    string,
    string | number | boolean,
    string | number
  >(v1, [
    [(v: string) => typeof v === 'string', (v: string) => `v: ${v}`],
    [(v: number) => typeof v === 'number', (v: number) => v + 1],
    [(v: boolean) => typeof v === 'boolean', (v: boolean) => `v: ${v}`],
  ])
  expect(typeof r1).toBe('string')
  expect(r1).toBe(`v: false`)
  const v2 = 1
  const r2 = match<number, string>(v2, [
    [(v: number) => v === 1, (v: number) => `${v}`],
    [(v: number) => v === 2, (v: number) => `${v}`],
    [(v: number) => v === 3, (v: number) => `${v}`],
    [(v: number) => v === 4, (v: number) => `${v}`],
    [(v: number) => true, (v: number) => `${v}`],
  ])
  expect(typeof r2).toBe('string')
  expect(r2).toBe(`${v2}`)
})
