module.exports = (collection) => {
  let state = {}
  collection.lang.forEach((l) => {
    state[l] = collection.fields.reduce((fields,f) => {
      fields[f.name] = null
      return fields
    },{})
  })
  return state
}
