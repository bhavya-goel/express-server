import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { userModel } from "../repositories/user/UserModel";

let app1;
let token;

describe("Sucessfully fetch all trainee details", () => {
  beforeAll(async (done) => {

    userModel.deleteMany({role: "trainee"}, (err) => {
      console.log(err);
    });
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await app1.run();
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@successive.tech",
        "password": "trainer@123" });
    expect(res.status).toEqual(200);
    expect(res.body).toHaveProperty("data");
    token = res.body.data;
    done();
  });
  afterAll(async (done) => {
    await app1.close();
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

  test("try to create trainee with existing ID", async (done) => {
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
    done();
  });

  test("create trainee with wrong name type", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token)
      .send({
        "email": "abc@succesive.tech",
        "name": "abc",
        "password": "abc" });
    expect(res.status).toEqual(400);
    expect(res.body).toHaveProperty("error");
    expect(res.body .error).toEqual("Bad Request");
    expect(res.body.message).toContain("Please enter email in proper format");
    done();
  });

});
