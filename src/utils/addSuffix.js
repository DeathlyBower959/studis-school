export const addNumberSuffix = (n) =>
  n +
  (n % 10 == 1 && n % 100 != 11
    ? 'st'
    : n % 10 == 2 && n % 100 != 12
    ? 'nd'
    : n % 10 == 3 && n % 100 != 13
    ? 'rd'
    : 'th')
