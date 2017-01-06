module.exports = (name, displayName = name) => {
  let state = {
    name,
    displayName,
    lang: ['en'],
    fields: [
      {name: 'name', type:'shortText'},
      {name: 'content', type:'longText'}
    ]
  }
  return state
}
