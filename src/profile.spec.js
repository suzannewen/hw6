/*
 * Test suite for profile.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Profile functionality', () => {

  it('should give me headline of logged in user', (done) => {
    fetch(url("/headlines"))
      .then( res => {
          expect(res.status).to.eql(200)
          return res.text()
      })
      .then( body => {
          expect(body).to.eql( '{"headlines":[{"username":"FooBar","headline":"This is my headline!"}]}' )
      })
      .then(done)
      .catch(done)
  }, 200)

  it('should give me headline of specified user', (done) => {
    fetch(url("/headlines/FooBar"))
      .then( res => {
          expect(res.status).to.eql(200)
          return res.text()
      })
      .then( body => {
         const headlines = JSON.parse(body).headlines
          expect(headlines[0].headline).to.eql("This is my headline!")
      })
      .then(done)
      .catch(done)
  }, 200)

  const options =  {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( { 'headline': 'This is my new headline' } )
  }

  it('should update headline for logged in user', (done) => {
    fetch(url("/headline"), options) //do i make another fetch call???
      .then( res => {
          expect(res.status).to.eql(200)
          return res.text()
      })
      .then( body => {
          const headlines = JSON.parse(body).headlines
          expect(headlines).to.eql( [{"username":"FooBar","headline":"This is my new headline"}] )
      })
      .then(done)
      .catch(done)
  }, 200)

});