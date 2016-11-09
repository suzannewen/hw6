import { expect } from 'chai'
import { go, sleep, findId, findCSS, findClass, By } from './selenium'
import common from './common'

describe('Rice Book E2E Testing', () => {

    const title = 'riceBOOK'

    before('should log in', (done) => {
        go().then(common.login).then(done)
    })

    it('should log in as the test user', (done) => {
        sleep(1000)
        .then(findId('title').getText()
            .then(text => {
                expect(text).to.equal('riceBOOK')
            })
            .then(done))
    })

    it("should upload a new post and verify that the article appears", (done) => {
         const newPost = 'This is a test post'

         const newArticle = (newPost) => () => 
             findId('article_text').sendKeys(newPost)
             .then(findId('right').click())
             .then(findId('post').getText().then(text => {
                 expect(text).to.equal(newPost)
             }))

         newArticle(newPost)()
         .then(done)
     })

    // it("should edit an article and validate that the article text has updated", (done) => {

    // })

    // it("should update the status headline and verify the change", (done) => {

    // })

    // it("should count the number of followed users", (done) => {

    // })

    // it("should add the user Follower to the list of followed users and verify the count increases by one", (done) => {

    // })

    // it("should remove the user Follower from the list of followed users and verify the count decreases by one", (done) => {

    // })

    // it("should search for Only One Article Like This and verify only one article shows, and verify the author", (done) => {

    // })

    it("should navigate to the profile view, Update the user's email and verify", (done) => {
        const newEmail = 'test@gmail.com'

        sleep(1000)
        .then(findId('profile_button').click())
        .then(sleep(2000))
        .then(findId('email').sendKeys(newEmail))
        .then(findId('update').click())
        .then(sleep(1000))
        .then(findId('emailCurrent').getText().then( text => {
            expect(text).to.equal(newEmail)
        }))
    })

    it("should update the user's zipcode and verify", (done) => {
        const newZip = '30992'
        
        (findId('zipcode').sendKeys(newEmail))
        .then(findId('update').click())
        .then(sleep(1000))
        .then(findId('emailCurrent').getText().then( text => {
            expect(text).to.equal(newEmail)
        }))
    })

    // it("should update the user's password, verify a will not change message is returned", (done) => {

    // })
})
