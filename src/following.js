const getFriends = (req, res) => {
  res.send({ hello: 'world' })
}

const addFriends = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

const deleteFriend = (req, res) => {
  res.send( { articles: [ {id: 0, text: 'test1' }, {id: 1, text: 'test2' }, {id: 2, text: 'test3' } ] })
}

module.exports = (app) => {
  app.get('/following', getFriends)
  app.put('/following', addFriend)
  app.delete('/following', deleteFriend)
}