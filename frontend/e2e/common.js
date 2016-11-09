import { expect } from 'chai'
import { findId, sleep } from './selenium'

exports.creds = {
    username: 'yw25',
    password: 'raise-machine-brown'
}

exports.login = () => 
    sleep(500)
    .then(findId('login_username').clear())
    .then(findId('login_password').clear())
    .then(findId('login_username').sendKeys(exports.creds.username))
    .then(findId('login_password').sendKeys(exports.creds.password))
    .then(findId('login_button').click())
    .then(sleep(2000))

exports.logout = () =>
    sleep(500)
    .then(findId('logout').click())
    .then(sleep(2000))
    // .then(findId('message').getText()
    //     .then(text => {
    //         expect(text).to.equal('You have logged out') }))
