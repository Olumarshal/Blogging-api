const supertest = require('supertest');
const { connect } = require('./database')
const User = require("../models/user.model");
const app = require('../app');


describe('validating user credentials', () => {
    // let conn;

    // beforeAll(async () => {
    //     conn = await connect()
    // })

    // afterEach(async () => {
    //     await conn.cleanup()
    // })

    // afterAll(async () => {
    //     await conn.disconnect()
    // })

    it('should signup a user', async () => {
        const response = await supertest(app).post('/api/v1/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'Mars7', 
            password: 'fcbarca909', 
            firstName: 'Marshal',
            lastName: 'Ken',
            email: 'ycef@mail.com'
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('message')
        expect(response.body).toHaveProperty('user')
        expect(response.body.user).toHaveProperty('username', 'Mars7')
        expect(response.body.user).toHaveProperty('firstname', 'Marshal')
        expect(response.body.user).toHaveProperty('lastname', 'Ken')
        expect(response.body.user).toHaveProperty('email', 'ycef@mail.com')        
    }, 100000)


    it('should test if the username already exixt', async () => {
        const response = await supertest(app).post('/api/v1/signup')
        .set('content-type', 'application/json')
        .send({ 
            username: 'Mars7', 
            password: 'fcbarca909', 
            firstName: 'Jumbo',
            lastName: 'Danny',
            email: 'tom@mail.com'
        })
        
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("username and password must be unique")
    }, 100000)

    it('should login a user', async () => {
        // create user in out db
        const user = await User.create({ username: 'Mars7', password: 'fcbarca909'});

        // login user
        const response = await supertest(app)
        .post('/api/v1/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'Mars7', 
            password: 'fcbarca909'
        });
    

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('token')      
    })
})
