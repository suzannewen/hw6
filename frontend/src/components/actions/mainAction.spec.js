import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'

let updateHeadline, url

beforeEach(() => {
  if (mockery.enable) {
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')

    updateHeadline = require('./headlineAction').updateHeadline
    url = require('../actions/resource').url

  }
})

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})

describe('Validate Headline Actions', () => {

it('should update headline', (done) => {
    mock(`${url}/headline`, {
      method: 'PUT',
      headers: {'Content-Type':'application/json'},
      json: { headline: 'testtest' }
   })

  let headline = 'testtest'

  updateHeadline(headline)(action => {
    expect(action).to.eql({ type: 'UPDATE_HEADLINE', headline: headline })
    done()
  })
})

})