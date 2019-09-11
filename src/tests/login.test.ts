import * as request from 'supertest';
import config from './config';

let app1;

describe('Login EndPoint', () => {
  beforeAll(async (done) => {
    app1 = await config.start();
    done();
  });

  afterAll(async (done) => {
    await config.close();
    console.log('closed');
    done();
  });

  test('try to login successfully', async (done) => {
    const res = await request(app1.app)
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'head.trainer@successive.tech',
        password: 'trainer@123' });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty('data');
    done();
  });

  test('try to fail login ', async (done) => {
    const res = await request(app1.app)
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'head.trainer@succesive.tech',
        password: '' });

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('Bad Request');
    expect(res.status).toEqual(400);
    done();
  });

  test('try to login with wrong ID ', async (done) => {
    const res = await request(app1.app)
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'head.traier@successive.tech',
        password: 'trainer@123' });

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('email not found');
    expect(res.status).toEqual(400);
    done();
  });

  test('try to login with password ', async (done) => {
    const res = await request(app1.app)
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'head.trainer@successive.tech',
        password: 'traer@123' });

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toEqual('password not matched');
    expect(res.status).toEqual(400);
    done();
  });

});
