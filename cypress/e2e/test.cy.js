let NEW_USER_NAME = 'bobby joe'
describe('Check API Requests', function () {
    before('Load JSON data', function () {
        cy.fixture('users').then((userList) => { //file can be found in fixtures folder
            this.userList = userList
        }) //fixtures can be imported in multiple ways, if wished to use arrow functions () => instead of function() , them import of fixture must be declared at top of the page
    })
    it('API Test returns JSON with a list of users ', function () {

        cy.request({
            method: 'GET',
            url: '/users', //assuming baseUrl is set    
        }).then((reqResponse) => {
            expect(reqResponse.status).to.equal(200)
            expect(reqResponse.body).to.include(this.userList.userAndId1)
            expect(reqResponse.body).to.include(this.userList.userAndId2)
        })
    })
    it('API Test endpoint /new returns expected text ', function () {

        cy.request({
            method: 'GET',
            url: '/new', //assuming baseUrl is set    
        }).then((reqResponse) => {
            expect(reqResponse.status).to.equal(200)
            expect(reqResponse.body.text).to.deep.equal('welcome to the new page')
        })
    })
    it('API Test endpoint /nonexisting returns 404 status ', function () {

        cy.request({
            method: 'GET',
            url: '/nonexisting', //assuming baseUrl is set    
        }).then((reqResponse) => {
            expect(reqResponse.status).to.equal(404)

        })
    })
    it('API Test root path returns redirects ', function () {

        cy.request({
            method: 'GET',
            url: '/', //assuming baseUrl is set    
        }).then((reqResponse) => {
            expect(reqResponse.status).to.equal(301)

        })
    })
    it('API Test adding new user to the list', function () {

        cy.request({
            method: 'POST',
            url: '/users', //assuming baseUrl is set 
            body: { name: NEW_USER_NAME }
        }).then((reqResponse) => {
            expect(reqResponse.status).to.equal(200)
            expect(reqResponse.body.name).to.include(NEW_USER_NAME)
        })
    })
})
// additionally we can add custom commands to  increase code usability -> custom command that receives as parameter the type of request + endpoint -> increase reusability