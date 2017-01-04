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
