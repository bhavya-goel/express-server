import * as request from 'supertest';
import config from './config';

let app1;

describe('Health-check', () => {
  beforeAll(async (done) => {
    app1 = await config.start();
    done();
  });

  test('try to run server successfully', async (done) => {
    const res = await request(app1.app)
      .get('/health-check');

    expect(res.status).toEqual(200);
    expect(res.text).toMatch('I am OK');
    done();
  });

  test('try with wrong url', async (done) => {
    const res = await request(app1.app)
      .get('/health');

    expect(res.body).toHaveProperty('error');
    expect(res.body.message).toEqual('Not Found');
    expect(res.status).toEqual(404);
    done();
  });
});
