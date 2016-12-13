import { resource } from './resource'
import { fetchData } from '../actions/dataAction'

const updateAvatar = (fd) => (dispatch) => {
  console.log(fd)
  const options =  {
    method: 'PUT',
    credentials: 'include',
    body: fd }

  fetch(`http://localhost:3000/avatar`, options)
  .then (res => console.log(res))
  // resource('PUT', 'avatar', fd)
  // .then( r => {
  //     dispatch({ type: 'AVATAR', avatar: r.url})
  // })   
}

const updateZipcode = ( zipcode ) => (dispatch) =>
  resource('PUT', 'zipcode', { zipcode: zipcode })
  .then( r => {
      dispatch({ type: 'ZIPCODE', zipcode: zipcode})
  })   

const updateEmail = ( email ) =>  (dispatch) => 
  resource('PUT', 'email', { email: email })
    .then(r => {
      dispatch({ type: 'EMAIL',  email: email })
      })   

const updatePW = ( password ) =>  (dispatch) => 
  resource('PUT', 'password', { password: password })
    .then( 
      dispatch({ type: 'PASSWORD', password: password }) 
    )
    .catch() 

export { updateZipcode, updateEmail, updatePW, updateAvatar }