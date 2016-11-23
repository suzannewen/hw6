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

  //prevents user from adding themselves as a friend
  if (newFriend === req.username) {
    return res.status(404).send( 'You cannot add yourself as a friend.' )
  }

  Profile
    .findOne( { username: req.username } )
    .exec( (err, foundUser) => { 
      currentFollow = foundUser.following //gets the current friend list

      Profile
        .findOne( { username: newFriend } )
        .exec( (err, foundFriend) => { //checks if added friend exists
          if (foundFriend === null) {
            return res.status(404).send( 'This user does not exist.' )
          }
          else {
            let newFollowing = currentFollow
            if (currentFollow.includes(newFriend) === false) { //only add the friend if they don't already exist
              newFollowing = newFollowing.concat( [ newFriend ] )
            }
            Profile
              .findOneAndUpdate( { username: req.username }, { following: newFollowing })
              .exec( (err, foundUser) => {
                  return res.send( { username: req.username, following: newFollowing } )
              })
          }
        })
    })
}

const deleteFriend = (req, res) => {
  const removeFriend = req.params.user

  Profile
    .findOne( { username: req.username } )
    .exec( (err, foundUser) => { 
      currentFollow = foundUser.following //gets the current friend list

      const index = currentFollow.indexOf(removeFriend)
      if (index > -1 )  {
        currentFollow.splice(index, 1) //friend is removed from current following list
      }

      Profile
        .findOneAndUpdate( { username: req.username }, { following: currentFollow })
        .exec( (err, foundUser) => {
          return res.send( { username: req.username, following: currentFollow } )
        })
    })
}

module.exports = (app) => {
  app.get('/following/:user?', getFriends)
  app.put('/following/:user', addFriend)
  app.delete('/following/:user', deleteFriend)
}