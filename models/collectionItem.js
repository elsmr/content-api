let state = {
  name: "Books",
  lang: ['en', 'fr', 'nl'],
  fields: [
    {name: 'name', type:'shortText'},
    {name: 'content', type:'longText'},
    {name: 'primaryColor', type:'color'}
  ]
}

let item = (collection) => {
  let state = {}
  collection.lang.forEach(l => {
    state[l] = collection.fields.reduce((fields,f) => {
      fields[f.name] = ''
      return fields
    },{})
  })
  return state
}

console.log(JSON.stringify(item(state), null, 2))
