import { resource } from '../actions/resource'
import { fetchData, getFriends } from '../actions/dataAction'

//resource called to 'put' headline into database
const updateHeadline = ( headline ) =>  (dispatch) => 
  resource('PUT', 'headline', { headline: headline })
    .then(r => {
      dispatch({ type: 'UPDATE_HEADLINE',  headline: headline })
      })   

const addFriend = ( newFriend ) =>  (dispatch) => {
  let friendList = ''
  resource('PUT', 'following/' + newFriend)
  .then ( r => {
    friendList = r.following.toString()
    return resource('GET', 'headlines/' + friendList) 

  })
  .then( r => {
    dispatch ( { type: 'FRIEND', friends: r.headlines })
  })
}

const deleteFriend = ( deleted ) =>  (dispatch) => {
  let friendList = ''
  resource('DELETE', 'following/' + deleted)
    .then(r => {
      friendList = r.following.toString()
      return resource('GET', 'headlines/' + friendList) 
    })
    .then( r=> {
      if (friendList.length === 0) { //if friend list is empty, update state with an empty friend list (otherwise, /headlines will send back logged in user)
        dispatch ( { type: 'FRIEND', friends: [] })
      }
      else {
        dispatch ( { type: 'FRIEND', friends: r.headlines })
      }
    })   
  }

export { updateHeadline, addFriend, deleteFriend }