const supertest = require('supertest');
const {startApp} = require('../../src');

describe('Meta', () => {
  let request = null;

  beforeAll(async () => {
    const app = await startApp();
    request = supertest(app);
  });

  describe('GET /v1/health', () => {
    it('<200> should always return with the API server information',
        async () => {
          const res = await request.get('/v1/health')
              .expect('Content-Type', /json/)
              .expect(200);
          const health = res.body;
          const expected = ['name', 'version'];
          expect(Object.keys(health)).toEqual(expect.arrayContaining(expected));
        });
  });
});
