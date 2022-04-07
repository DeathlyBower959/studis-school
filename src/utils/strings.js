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

export const hammingDistance = (str1, str2) => {
  if (!str1 || !str2) return 10
  
  let dist = 0

  str1 = str1.toLowerCase()
  str2 = str2.toLowerCase()
  for (let i = 0, j = Math.max(str1.length, str2.length); i < j; i++) {
    if (!str1[i] || !str2[i] || str1[i] !== str2[i]) {
      dist++
    }
  }
  return dist
}

export const objectByString = (o, s) => {
  s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  s = s.replace(/^\./, '');           // strip a leading dot
  var a = s.split('.');
  for (var i = 0, n = a.length; i < n; ++i) {
      var k = a[i];
      if (k in o) {
          o = o[k];
      } else {
          return;
      }
  }
  return o;
}