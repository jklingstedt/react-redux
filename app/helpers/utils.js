const formatUserInfo = (name, avatar, uid) => {
  return {
    name,
    avatar,
    uid,
  }
}

const formatDuck = (text, { name, avatar, uid }) => {
  return {
    text,
    name,
    avatar,
    uid,
    timestamp: Date.now(),
  }
}

export { formatUserInfo, formatDuck }

