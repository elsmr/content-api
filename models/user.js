module.exports = ({username, password, permissions}) => {
  let state = {
    username,
    password,
    permissions: permissions || {
      admin: false,
      collections: {
        '_default': {read: true, write: true}
      },
      media: {read: true, write: true}
    }
  }
  return state
}
