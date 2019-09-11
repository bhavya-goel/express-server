import * as request from 'supertest';
import config from './config';

let app1;
let token;
let id;

describe('Sucessfully update trainee ', () => {
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
    const res = await request(app1.app)
      .post('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
          email: 'abc1@successive.tech',
          name: 'abc1',
          password: 'abc1' });
    id = res.body.data.originalID;
    done();
  });

  afterAll(async (done) => {
    await config.close();
    console.log('closed');
    done();
  });

  test('try to update trainee successfully', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          name: 'hello' },
        id });

    expect(res.body).toHaveProperty('data');
    expect(res.body.data).toHaveProperty('id');
    expect(res.body.data.id).toEqual(id);
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch('Trainee Updated Successfully');
    done();
  });

  test('try to update trainee with existing email', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          email: 'head.trainer@successive.tech' },
        id });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body.message).toMatch('email exists');
    done();
  });

  test('try to update trainee without inputs', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token);

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body.message).toContain('dataToUpdate is required');
    expect(res.body.message).toContain('id is required');
    done();
  });

  test('try to update trainee with wrong ID', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          name: 'hello' },
        id: '12345' });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body.message).toMatch('User not found');
    done();
  });

  test('try to update trainee with wrong input type', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: '',
        id: {} });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body.message).toContain('dataToUpdate must be an object');
    expect(res.body.message).toContain('id must be a string');
    done();
  });

  test('try to update trainee with wrong dataToUpdate type', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {
          email: 'test@gmail.com',
          name: 'test@!',
          password: '' },
        id: '12345' });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body.message).toContain('enter an alphanumeric name\
,password cannot be empty,Please enter email in proper format');

    done();
  });

  test('try to update without any dataToUpdate field', async (done) => {
    const res = await request(app1.app)
      .put('/api/trainee')
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .send({
        dataToUpdate: {},
        id: '' });

    expect(res.body).toHaveProperty('error');
    expect(res.status).toEqual(400);
    expect(res.body.message).toContain('please provide something meaningful to update');
    expect(res.body.message).toContain('id cannot be empty');
    done();
  });
});
