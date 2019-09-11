import { configuration } from "../config";
import { Database } from "../libs";
import { Server } from "../Server";
import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";

let app1;
let token;
let mongoServer = new MongoMemoryServer();

describe("Sucessfully fetch all trainee details", () => {
  beforeAll(async (done) => {
    const url = await mongoServer.getConnectionString();
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(url);
    done();
  });

  beforeAll(async (done) => {
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@successive.tech",
        "password": "trainer@123" });
    token = res.body.data;
    done();
  });

  afterAll(async (done) => {
    await mongoServer.stop();
    console.log("closed");
    done();
  });

  test("try to create trainee successfully", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token)
      .send({
        "email": "abc@successive.tech",
        "name": "abc",
        "password": "abc" });

    expect(res.body).toHaveProperty("data");
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch("Trainee Created Successfully");

    done();
  });

  test("try to create trainee with existing email", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token)
      .send({
        "email": "abc@successive.tech",
        "name": "abc",
        "password": "abc" });

    expect(res.body).toHaveProperty("error");
    expect(res.status).toEqual(400);
    expect(res.body .message).toEqual("email exists");

    done();
  });

  test("create trainee without body", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token);

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body .error).toEqual("Bad Request");
    expect(res.body.message).toContain("email is required");
    expect(res.body.message).toContain("name is required");
    expect(res.body.message).toContain("password is required");

    done();
  });

  test("create trainee with wrong input type", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token)
      .send({
        "email": "abc@succesive.tech",
        "name": "abc@.",
        "password": "" });

    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body .error).toEqual("Bad Request");
    expect(res.body.message).toContain("Please enter email in proper format");
    expect(res.body.message).toContain("enter a alphanumeric name");
    expect(res.body.message).toContain("password cannot be empty");

    done();
  });

});
