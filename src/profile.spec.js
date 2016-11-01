/*
 * Test suite for profile.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Profile functionality', () => {

  it('should give me headline of logged in user', (done) => {
    fetch(url("/headlines"))
    // IMPLEMENT ME
    done(new Error('Not implemented'))
  }, 200)

  it('should give me headline of specified user', (done) => {
    fetch(url("/headlines"))
    .then (res => {
      console.log(res)
      // expect(res.)
      // expect()g
    })
    // add a new article
    // verify you get the article back with an id
    // verify the content of the article
    // add a second article
    // verify the article id increases by one
    // verify the second artice has the correct content
    done(new Error('Not implemented'))
  }, 200)

  // updates value in memory for default user, so a GET call returns new value

  it('should update headline for logged in user', (done) => {
    fetch(url("/headlines"))
    .then (res => console.log(res))
    done(new Error('Not implemented'))
  }, 200)

});