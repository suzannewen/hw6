import { resource } from './resource'
import { connect } from 'react-redux';

//separate function called for each chunk of data needed 
function fetchData( dispatch ) {
      getHeadline(dispatch)
      .then ( getFriends(dispatch) )
      .then ( getAvatar()(dispatch) )
      .then ( getArticles()(dispatch) )
      .then ( getProfile()(dispatch) )
} 

function getHeadline (dispatch) {
       return resource('GET', 'headlines')
      .then ( r1 => {
        dispatch({ type: 'HEADLINE', username: r1.headlines[0].username, headline: r1.headlines[0].headline })
        } )
}

function getFriends (dispatch) {
      let friends = ''
      resource('GET', 'following')
      .then ( r2 => {
          friends = r2.following.toString()
          return resource('GET', 'headlines/' + friends)
      })
      .then ( r3 =>  {
          if (friends.length === 0) { //if friend list is empty, update state with an empty friend list (otherwise, /headlines will send back logged in user)
            dispatch ( { type: 'FRIEND', friends: [] })
          }
          else {
            dispatch ( { type: 'FRIEND', friends: r3.headlines })
          }
      })
}

const getAvatar = () => (dispatch) => {
      return resource('GET', 'avatars')
      .then ( r4 => {
        dispatch( { type: 'AVATAR', avatar: r4.avatar } ) 
      })
}

const getArticles = () => (dispatch) => {
      return resource('GET', 'articles') //needs to add showComments boolean to each object
      .then ( r5 => {
        console.log(r5)
        dispatch( { type: 'ARTICLES', articles: r5.articles } )
      } )
}

const getProfile = () => (dispatch) => {
      return resource('GET', 'email')
      .then ( r6 => dispatch( { type: 'EMAIL', email: r6.email } ))
      .then ( r7 => resource('GET', 'zipcode') )
      .then ( r7 => dispatch( { type: 'ZIPCODE', zipcode: r7.zipcode } ))
}


export default connect()(fetchData);

export { fetchData, getArticles, getProfile, getFriends }