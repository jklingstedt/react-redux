export default function auth () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'Jason Klingstedt',
        avatar: 'https://pbs.twimg.com/profile_images/257653764/twitter_bigger.jpg',
        uid: 'jklingstedt',
      })
    }, 2000)
  })
}

export function checkIfAuthed (store) {
  // ignore firebase
  return store.getState().isAuthed
}

export function logout () {
  console.log('logged out')
}
