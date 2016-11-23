import { resource } from './resource'
import { fetchData } from '../actions/dataAction'

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

export { updateZipcode, updateEmail, updatePW }