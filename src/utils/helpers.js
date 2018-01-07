export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}

export function trim (str) {
  return str.length > 16
    ? str.slice(0, 16) + '...'
    : str
}