import { ref } from 'config/constants'

const saveToDucks = (duck) => {
  const duckId = ref.child('ducks').push().key
  const duckPromise = ref.child(`ducks/${duckId}`).set({
    ...duck, duckId,
  })

  return {
    duckId,
    duckPromise,
  }
}

const saveToUsersDucks = (duck, duckId) => {
  return ref.child(`usersDucks/${duck.uid}/${duckId}`)
    .set({...duck, duckId})
}

const saveLikeCount = (duckId) => {
  return ref.child(`likeCount/${duckId}`).set(0)
}

const saveDuck = (duck) => {
  const { duckId, duckPromise } = saveToDucks()
  return Promise.all([
    duckPromise,
    saveToUsersDucks(duck, duckId),
    saveLikeCount(duckId),
  ]).then(() => ({...duck, duckId}))
}

const listenToFeed = (cb, errorCB) => {
  ref.child('ducks').on('value', (snapshot) => {
    const feed = snapshot.val() || {}
    const sortedIds = Object.keys(feed).sort((a, b) => {
      return feed[b].timestamp - feed[a].timestamp
    })
    cb({feed, sortedIds})
  }, errorCB())
}

export { saveToDucks, saveToUsersDucks, saveLikeCount, saveDuck, listenToFeed }
