/**
 * @deprecated
 * @param value
 * @param cases
 */
export function match<I1, R1, I2, R2, I = I1 | I2, R = R1 | R2>(
  value: I,
  cases: [
    [(v: I1) => boolean, (v: I1) => R1],
    [(v: I2) => boolean, (v: I2) => R2]
  ]
): R

/**
 * @deprecated
 * @param value
 * @param cases
 */
export function match<
  I1,
  R1,
  I2,
  R2,
  I3,
  R3,
  I = I1 | I2 | I3,
  R = R1 | R2 | R3
>(
  value: I,
  cases: [
    [(v: I1) => boolean, (v: I1) => R1],
    [(v: I2) => boolean, (v: I2) => R2],
    [(v: I3) => boolean, (v: I3) => R3]
  ]
): R

/**
 * @deprecated
 * @param value
 * @param cases
 */
export function match<
  I1,
  R1,
  I2,
  R2,
  I3,
  R3,
  I4,
  R4,
  I = I1 | I2 | I3 | I4,
  R = R1 | R2 | R3 | R4
>(
  value: I,
  cases: [
    [(v: I1) => boolean, (v: I1) => R1],
    [(v: I2) => boolean, (v: I2) => R2],
    [(v: I3) => boolean, (v: I3) => R3],
    [(v: I4) => boolean, (v: I4) => R4]
  ]
): R

/**
 * @deprecated
 * @param value
 * @param cases
 */
export function match<
  I1,
  R1,
  I2,
  R2,
  I3,
  R3,
  I4,
  R4,
  I5,
  R5,
  I = I1 | I2 | I3 | I4 | I5,
  R = R1 | R2 | R3 | R4 | R5
>(
  value: I,
  cases: [
    [(v: I1) => boolean, (v: I1) => R1],
    [(v: I2) => boolean, (v: I2) => R2],
    [(v: I3) => boolean, (v: I3) => R3],
    [(v: I4) => boolean, (v: I4) => R4],
    [(v: I5) => boolean, (v: I5) => R5]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [[(v: I) => boolean, (v: I) => R], [(v: I) => boolean, (v: I) => R]]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [[(v: I) => boolean, (v: I) => R], [(v: I) => boolean, (v: I) => R]]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param v
 * @param cases
 */
export function match<I, R>(
  v: I,
  cases: [
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R],
    [(v: I) => boolean, (v: I) => R]
  ]
): R

/**
 * @deprecated
 * @param value
 * @param cases
 * @returns
 */
export function match(
  value: any,
  cases: [(v: any) => boolean, (v: any) => any][]
): any {
  for (const [validate, map] of cases) {
    if (validate(value)) {
      return map(value)
    }
  }
  throw new Error(`unknown case of value[${value}]`)
}
