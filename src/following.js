const Profile = require('../model').Profile

const getFriends = (req, res) => {
  let user = ''
    if (!req.params.user) {
      user = req.username
    }
    else {
      user = req.params.user
    }
  Profile
    .findOne( { username: user } )
    .exec( (err, foundUser) => { 
      return res.send({ username: user, following: foundUser.following })
    })
}

const addFriend = (req, res) => {
  const newFriend = req.params.user
  let currentFollow = []

  Profile
    .findOne( { username: req.username } )
    .exec( (err, foundUser) => { 
      currentFollow = foundUser.following //gets the current friend list
    })

  Profile
    .findOne( { username: newFriend } )
    .exec( (err, foundFriend) => { //checks if added friend exists
      if (foundFriend === null) {
        return res.status(404).send( 'This user does not exist.' )
      }
      else {
        const newFollowing = currentFollow.concat( [ newFriend] )
        Profile
          .findOneAndUpdate( { username: req.username }, { following: newFollowing })
          .exec( (err, foundUser) => {
              res.send( { username: req.username, following: newFollowing } )
          })
      }
    })
}

const deleteFriend = (req, res) => {
  const user = req.params.user //if its blank??
  res.send( { username: 'FooBar', following: [ 'yw25' ] } )
}

module.exports = (app) => {
  app.get('/following/:user?', getFriends)
  app.put('/following/:user', addFriend)
  app.delete('/following:user', deleteFriend)
}