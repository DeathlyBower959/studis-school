export const addNumberSuffix = (n) =>
  n +
  (n % 10 == 1 && n % 100 != 11
    ? 'st'
    : n % 10 == 2 && n % 100 != 12
    ? 'nd'
    : n % 10 == 3 && n % 100 != 13
    ? 'rd'
    : 'th')

export const truncateString = (str, n, useWordBoundary) => {
  if (!str || str.trim().length == 0) return str
  if (str.length <= n) {
    return str
  }
  const subString = str.substr(0, n - 1) // the original check
  return (
    (useWordBoundary
      ? subString.substr(0, subString.lastIndexOf(' '))
      : subString) + ' ...'
  )
}
