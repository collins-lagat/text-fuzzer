const toFinite = (value: unknown): number => {
  const INFINITY = 1 / 0
  const MAX_INTEGER = 1.7976931348623157e308

  if (!value) {
    return value === 0 ? value : 0
  }

  if (value === INFINITY || value === -INFINITY) {
    const sign = value < 0 ? -1 : 1
    return sign * MAX_INTEGER
  }
  return value === value ? (value as number) : 0
}

export const range = (start: number, end?: number): number[] => {
  let _start = toFinite(start)
  let _end: number

  if (end === undefined) {
    _end = start
    _start = 0
  } else {
    _end = toFinite(end)
  }

  let length = Math.max(Math.ceil((_end - _start) / 1), 0)

  const result = new Array(length)
  let index = -1
  while (length--) {
    result[++index] = start
    start += 1
  }

  return result
}
