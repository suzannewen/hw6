const Reducer = (state =  {
  location: 'LANDING_PAGE',
  username: '',
  headline: '',
  avatar: '',
  email: '',
  zipcode: '',
  nextFriendId: 0,
  friends: [],
  friendAvatars: [],
  articles: []
}, action) => {
  switch(action.type) {
    case 'NAVIGATION':
      return { ...state, location: action.location }
    case 'HEADLINE':
      return { ...state, username: action.username, headline: action.headline }
    case 'UPDATE_HEADLINE':
      return { ...state, headline: action.headline }
    case 'FRIEND':
      return { ...state, nextFriendId: state.nextFriendId + 1, 
          friends: action.friends }
    case 'AVATAR':
      return { ...state, avatar: action.avatar }
    case 'EMAIL':
      return { ...state, email: action.email }
    case 'ZIPCODE':
      return { ...state, zipcode: action.zipcode }
    case 'ARTICLES':
      return { ...state, articles: action.articles }
    case 'LOGOUT':
      return { ...state, location: 'LANDING_PAGE', username: '', headline: '', avatar: '', email: '', zipcode: '', nextFriendId: 0, friends: [], friendAvatars: [], articles: [] }
    default: 
      return state
  }
}

export default Reducer