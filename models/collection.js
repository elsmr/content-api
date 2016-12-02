module.exports = (name) => {
  let state = {
    name,
    lang: ['en'],
    fields: [
      {name: 'name', type:'shortText'},
      {name: 'content', type:'longText'}
    ]
  }
  return state
}
