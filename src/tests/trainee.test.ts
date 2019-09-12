import * as request from 'supertest';
import config from './config';

let app1;
let token;
let traineeToken;

describe('Sucessfully perform operations via trainee token', () => {
  beforeAll(async (done) => {
    app1 = await config.start();
    done();
  });

  beforeAll(async (done) => {
    const res = await request(app1.app)
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'head.trainer@successive.tech',
        password: 'trainer@123' });
    token = res.body.data;
    done();
  });

  beforeAll(async (done) => {
    const res1 = await request(app1.app)
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'abc@successive.tech',
        name: 'abc',
        password: 'abc' });
    done();

  });
  beforeAll(async (done) => {
    const res1 = await request(app1.app)
      .post('/api/user/login')
      .set('Accept', 'application/json')
      .send({
        email: 'abc@successive.tech',
        password: 'abc' });
    traineeToken = res1.body.data;
    done();

  });

  afterAll(async (done) => {
    await config.close();
    console.log('closed');
    done();
  });

  test('try to fetch trainee details successfully', async (done) => {
    const res = await request(app1.app)
      .get('/api/user/me')
      .set('Authorization', traineeToken);

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data.name).toEqual('abc');
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch('User details fetched');
    done();
  });

  test('try to create trainee with trainee token', async (done) => {
    const res = await request(app1.app)
      .post('/api/trainee')
      .set('Authorization', traineeToken)
      .send({
        email: 'abc1@successive.tech',
        name: 'abc1',
        password: 'abc1' });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(403);
    expect(res.body.message).toMatch('you are not authorized to access it');
    done();
  });

  test('try to update trainee with trainee token', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Authorization', traineeToken)
      .send({
        dataToUpdate: {
          name: 'hello' },
        id: '123434' });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(403);
    expect(res.body.message).toMatch('you are not authorized to access it');
    done();
  });

  test('try to fetch all trainee with trainee token', async (done) => {
    const res = await request(app1.app)
      .get('/api/trainee')
      .set('Authorization', traineeToken);

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(403);
    expect(res.body.message).toMatch('you are not authorized to access it');
    done();
  });
});
