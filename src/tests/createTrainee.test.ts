import * as request from 'supertest';
import config from './config';

let app1;
let token;

describe('Sucessfully fetch all trainee details', () => {
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

  afterAll(async (done) => {
    await config.close();
    console.log('closed');
    done();
  });

  test('try to create trainee successfully', async (done) => {
    const res = await request(app1.app)
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'abc@successive.tech',
        name: 'abc',
        password: 'abc' });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('name');
    expect(res.body.data.name).toEqual('abc');
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch('Trainee Created Successfully');

    done();
  });

  test('try to create trainee with existing email', async (done) => {
    const res = await request(app1.app)
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'abc@successive.tech',
        name: 'abc',
        password: 'abc' });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body .message).toEqual('email exists');

    done();
  });

  test('create trainee without body', async (done) => {
    const res = await request(app1.app)
      .post('/api/trainee')
      .set('Authorization', token);

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body .error).toEqual('Bad Request');
    expect(res.body.message).toContain('email is required');
    expect(res.body.message).toContain('name is required');
    expect(res.body.message).toContain('password is required');

    done();
  });

  test('create trainee with wrong input type', async (done) => {
    const res = await request(app1.app)
      .post('/api/trainee')
      .set('Authorization', token)
      .send({
        email: 'abc@succesive.tech',
        name: 'abc@.',
        password: '' });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty('error');
    expect(res.body .error).toEqual('Bad Request');
    expect(res.body.message).toContain('Please enter email in proper format');
    expect(res.body.message).toContain('enter a alphanumeric name');
    expect(res.body.message).toContain('password cannot be empty');

    done();
  });

});
