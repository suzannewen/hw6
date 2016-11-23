import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let navigate

beforeEach(() => {
  if (mockery.enable) {
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')

    navigate = require('./navActions').navigate
  }
})

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})

describe('Validate Actions', () => {

it('should navigate to each page', (done) => {
  let place = 'LANDING_PAGE'

  navigate(place)(action => {
    expect(action).to.eql({ type: 'NAVIGATION', location: place })
    done()
  })
})

})