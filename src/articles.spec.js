/*
 * Test suite for articles.js
 */
const expect = require('chai').expect
const fetch = require('isomorphic-fetch')

const url = path => `http://localhost:3000${path}`

describe('Validate Article functionality', () => {

	it('should give me three or more articles', (done) => {
		fetch(url("/articles"))
		.then (res => {
          		expect(res.status).to.eql(200)
          		return res.text()
     		 })
     		 .then (body => {
     		 	const articles = JSON.parse(body).articles
          		expect(articles.length).to.eql(3) //check length
      		})
		.then(done)
		.catch(done)
 	}, 200)

	const options =  {
	    method: 'POST',
	    credentials: 'include',
	    headers: {
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify( { 'text': 'This is my message' } )
	}

	it('adding article should increment the article id and have valid content', (done) => {
		fetch(url("/article"), options)
		.then (res => {
          		expect(res.status).to.eql(200)
          		return res.text()
		})
		.then (body => { //how to test if article increments????
			const newArticle = JSON.parse(body).articles
			expect(newArticle.text).to.eql('This is my message')
		})
		.then(done)
 	}, 200)

	it('should return an article with a specified id', (done) => {
		fetch(url("/articles/0,1"))
		.then (res => {
		       expect(res.status).to.eql(200)
          		return res.text()
          	})
		.then (body => {
			const articles = JSON.parse(body).articles
			expect(articles.length).to.eql(2)
		})
		// call GET /articles first to find an id, perhaps one at random
		// then call GET /articles/id with the chosen id
		// validate that only one article is returned
		.then(done)
	}, 200)

	it('should return nothing for an invalid id', (done) => {
		fetch(url("/articles/-1"))
		.then (res => {
		       expect(res.status).to.eql(200)
          		return res.text()
          	})
		.then (body => {
			const articles = JSON.parse(body).articles
			expect(articles[0]).to.be.null
		})
		// call GET /articles/id where id is not a valid article id, perhaps 0
		// confirm that you get no results
		.then(done)
	}, 200)

});
