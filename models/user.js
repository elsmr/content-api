module.exports = (username, password, permissions) => {
  let state = {
    username,
    password,
    permissions: permissions || {
      type: 'user',
      collections: {write: false},
      collectionItems: {write: true},
      media: {write: true}
    }
  }
  return state
}
