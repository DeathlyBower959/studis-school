export const isProvided = (provided = {}, required = []) => {
  let missing = []

  if (!provided) return required

  required.forEach((x) => {
    if (!provided[x]) missing.push(x)
  })

  return missing
}
