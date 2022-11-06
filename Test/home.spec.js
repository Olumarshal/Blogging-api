const supertest = require('supertest')
const app = require('../app');


describe('Home Route', () => {
    it('Should return status true', async () => {
        const response = await supertest(app).get('/').set('content-type', 'application/json')
        expect(response.status).toBe(200)
        expect(response.body).toEqual({ status: true, message: 'The Blog Api Home Route'})
    })

    it('Should return error when routed to undefined route', async () => {
        const response = await supertest(app).get('/auth').set('content-type', 'application/json')
        expect(response.status).toBe(404)
        expect(response.body).toEqual({ message: 'route not found' })
    })
});