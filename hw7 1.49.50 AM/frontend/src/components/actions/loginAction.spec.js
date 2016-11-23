import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let login, url, logout

beforeEach(() => {
  if (mockery.enable) {
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')

    login = require('./loginAction').login
    url = require('./resource').url
    logout = require('./loginAction').logout
  }
})

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})

describe('Validate Authentication', () => {

it('should log the user in', (done) => {
  
  // the result from the mocked AJAX call
  const username = 'foo'
  const password = 'bar'

  mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json: {username: username, result: "success"}
  })
 
  login(username, password)(action => {
    expect(action).to.eql({ type: 'NAVIGATION', location: 'MAIN_PAGE' })
    done()
  })
})

it('should not allow invalid users to login', (done) => { //check this!
  
  const username = 'foo'
  const password = 'bar'

  mock(`${url}/login`, {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    json: {username: username, result: "Unauthorized"}
  })

  login(username, password)(action => {
    expect(action).to.eql({ type: 'NAVIGATION', location: 'MAIN_PAGE' })
    done()
  })
})

it('should log a user out', (done) => {

  mock(`${url}/logout`, {
    method: 'PUT',
    headers: {'Content-Type':'application/json'},
  })
 
  logout()(action => {
    expect(action).to.eql({ type: 'LOGOUT' })
    done()
  })
})

})