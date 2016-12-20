const objectHasProps = (permissions, reqPermissions) => {
  for(let key in reqPermissions) {
    if(reqPermissions[key] === Object(reqPermissions[key])) {
      if(!objectHasProps(permissions[key], reqPermissions[key]))
        return false
    } else if(permissions[key] !== reqPermissions[key]) {
      return false
    }
  }
  return true
}

module.exports = objectHasProps
