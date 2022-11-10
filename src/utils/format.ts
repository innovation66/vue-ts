export function adc(str: string): string {
  const arr = str.split('-')
  arr.shift()
  arr.shift()
  return arr.join('-')
}
