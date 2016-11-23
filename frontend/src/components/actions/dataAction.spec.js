import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let getProfile, getArticles, url

beforeEach(() => {
  if (mockery.enable) {
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')

    getArticles = require('./dataAction').getArticles
    getProfile = require('./dataAction').getProfile
    url = require('./resource').url

  }
})

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})

describe('Validate Data Actions', () => {

it('should fetch user profile information', (done) => {
  mock(`${url}/email`, {
    method: 'GET',
    headers: {'Content-Type':'application/json'},
    json: { username: 'foo', email: 'testemail' }
  })

  let email = 'testemail'
 
  getProfile()(action => {
    expect(action).to.eql( { type: 'EMAIL', email: email } )
    done()
  })
})

})