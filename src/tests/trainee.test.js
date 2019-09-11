import { configuration } from "../config";
import { Database } from "../libs";
import { Server } from "../Server";
import request from "supertest";
import { userModel } from "../repositories/user/UserModel";
import { MongoMemoryServer } from "mongodb-memory-server";

let app1;
let token = null;
let traineeToken = null;
let mongoServer = new MongoMemoryServer();

describe("Sucessfully to perform operations via trainee token", () => {
  beforeAll(async (done) => {
    const url = await mongoServer.getConnectionString();
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(url);
    userModel.deleteMany({role: "trainee"});

    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@successive.tech",
        "password": "trainer@123" });
    token = res.body.data;
    done();

  });

  beforeAll(async (done) => {
    const res1 = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token)
      .send({
        "email": "abc@successive.tech",
        "name": "abc",
        "password": "abc" });
    done();

  });
  beforeAll(async (done) => {
    const res1 = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "abc@successive.tech",
        "password": "abc" });
    traineeToken = res1.body.data;
    done();

  });

  afterAll(async (done) => {
    await mongoServer.stop();
    console.log("closed");
    done();
  });

  test("try to fetch trainee details successfully", async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", traineeToken);

    expect(res.body).toHaveProperty("data");
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch("User details fetched");
    done();
  });

  test("try to create trainee with trainee token", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", traineeToken)
      .send({
        "email": "abc1@successive.tech",
        "name": "abc1",
        "password": "abc1" });

    expect(res.body).toHaveProperty("error");
    expect(res.status).toEqual(403);
    expect(res.body.message).toMatch("you are not authorized to access it");
    done();
  });

  test("try to update trainee with trainee token", async (done) => {
    const res = await request(app1.app)
      .put("/api/trainee")
      .set("Authorization", traineeToken)
      .send({
        "dataToUpdate": {
          "name": "hello" },
        "id": "123434" });

    expect(res.body).toHaveProperty("error");
    expect(res.status).toEqual(403);
    expect(res.body.message).toMatch("you are not authorized to access it");
    done();
  });

  test("try to fetch all trainee with trainee token", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee")
      .set("Authorization", traineeToken);

    expect(res.body).toHaveProperty("error");
    expect(res.status).toEqual(403);
    expect(res.body.message).toMatch("you are not authorized to access it");
    done();
  });
});
