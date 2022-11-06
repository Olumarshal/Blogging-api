const mongoose = require('mongoose')
const supertest = require('supertest')
const { connect } = require('./database');
const app = require('../app')
const Blog = require('../models/blog.model')
const User = require('../models/user.model');
const api = supertest(app)


describe('Order Route', () => {
    let conn;
    let token;

    beforeAll(async () => {
        conn = await connect()

        await User.create({ username: 'tobi', password: '123456'});

        const loginResponse = await api(app)
        .post('/login')
        .set('content-type', 'application/json')
        .send({ 
            username: 'tobi', 
            password: '123456'
        });

        token = loginResponse.body.token;
    })

    afterEach(async () => {
        await conn.cleanup()
    })

    afterAll(async () => {
        await conn.disconnect()
    })

    it('should return orders', async () => {
        // create order in our db
        await Blog.create({
            state: 1,
            total_price: 900,
            created_at: moment().toDate(),
            items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
        })

        await Blog.create({
            state: 1,
            total_price: 900,
            created_at: moment().toDate(),
            items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
        })

        const response = await api(app)
        .get('/orders')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('orders')
        expect(response.body).toHaveProperty('status', true)
    })

    it('should return orders with state 2', async () => {
        // create order in our db
        await Blog.create({
            state: 1,
            total_price: 900,
            created_at: moment().toDate(),
            items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
        })

        await Blog.create({
            state: 2,
            total_price: 900,
            created_at: moment().toDate(),
            items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
        })

        const response = await api(app)
        .get('/orders?state=2')
        .set('content-type', 'application/json')
        .set('Authorization', `Bearer ${token}`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('orders')
        expect(response.body).toHaveProperty('status', true)
        expect(response.body.orders.every(order => order.state === 2)).toBe(true)
    })
});
