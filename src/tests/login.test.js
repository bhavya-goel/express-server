// import { config } from "dotenv";
import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { Database } from "../libs";
import { MongoMemoryServer } from "mongodb-memory-server";

let app1;
let mongoServer = new MongoMemoryServer();

describe("Login EndPoint", () => {
  beforeAll(async (done) => {
    const url = await mongoServer.getConnectionString();
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(url);
    done();
  });

  afterAll(async (done) => {
    await mongoServer.stop();
    console.log("closed");
    done();
  });

  test("try to login successfully", async (done) => {
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@successive.tech",
        "password": "trainer@123" });

    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    done();
  });

  test("try to fail login ", async (done) => {
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@succesive.tech",
        "password": "" });

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Bad Request");
    expect(res.status).toEqual(400);
    done();
  });

  test("try to login with wrong ID ", async (done) => {
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.traier@successive.tech",
        "password": "trainer@123" });

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("email not found");
    expect(res.status).toEqual(400);
    done();
  });

  test("try to login with password ", async (done) => {
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@successive.tech",
        "password": "traer@123" });

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("password not matched");
    expect(res.status).toEqual(400);
    done();
  });

});
