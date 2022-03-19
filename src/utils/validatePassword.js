export default (password) => {
  if (!password || password?.trim().length === 0) return 'Missing password!'

  const passToValidate = password?.trim()
  if (passToValidate.length < 8) return 'Password too short!'

  return true
}
