import { expect } from 'chai'
import mockery from 'mockery'
import fetch, { mock } from 'mock-fetch'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import {findDOMNode} from 'react-dom'
import { Posts } from './posts'

beforeEach(() => {
  if (mockery.enable) {
    mockery.enable({warnOnUnregistered: false, useCleanCache:true})
    mockery.registerMock('node-fetch', fetch)
    require('node-fetch')
  }
})

afterEach(() => {
  if (mockery.enable) {
    mockery.deregisterMock('node-fetch')
    mockery.disable()
  }
})

describe('Validate Article Views', () => {

  it('should render article with text', () => {
    //creates post DOM node and validates inner HTML
    const node = TestUtils.renderIntoDocument(
      <div>
       <Posts key={ 2294 } text ={ "hello"} />
      </div>)

    const elements = findDOMNode(node).children[0]    
    expect(elements.children[0].innerHTML).to.equal('hello')
  })

})

