const getFriends = (req, res) => {
    if (!req.params.user) req.params.user = 'FooBoo'
    const user = req.params.user
  res.send({ username: user, following: [ 'yw25', 'sep1' ]})
}

const addFriend = (req, res) => {
  const user = req.params.user
  res.send( { username: 'FooBar', following: [ 'yw25', 'sep1' , 'khl3' ] } )
}

const deleteFriend = (req, res) => {
  const user = req.params.user //if its blank??
  res.send( { username: 'FooBar', following: [ 'yw25' ] } )
}

module.exports = (app) => {
  app.get('/following/:user?', getFriends)
  app.put('/following', addFriend)
  app.delete('/following', deleteFriend)
}