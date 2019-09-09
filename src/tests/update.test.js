import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { userModel } from "../repositories/user/UserModel";

let app1;
let token;

describe("Sucessfully update trainee ", () => {
  beforeEach(async (done) => {

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
    token = res.body.data;
    done();
  });
  afterEach(async (done) => {
    await app1.close();
    console.log("closed");
    done();
  });
  test("try to update trainee successfully", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
          "email": "abc1@successive.tech",
          "name": "abc1",
          "password": "abc1" });
    const id = res.body.data.originalID;
    console.log("id", id);

    const res1 = await request(app1.app)
      .put("/api/trainee")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
        "dataToUpdate": {
          "name": "hello" },
          "id": id });
    expect(res1.body).toHaveProperty("data");
    expect(res1.status).toEqual(200);
    expect(res1.body.message).toMatch("Trainee Updated Successfully");
    done();
  });

  test("try to update trainee with existing email", async (done) => {
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
          "email": "abc1@successive.tech",
          "name": "abc1",
          "password": "abc1" });
    const id = res.body.data.originalID;
    console.log("id", id);

    const res1 = await request(app1.app)
      .put("/api/trainee")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
        "dataToUpdate": {
          "email": "head.trainer@successive.tech" },
          "id": id });
    expect(res1.body).toHaveProperty("error");
    expect(res1.status).toEqual(400);
    expect(res1.body.message).toMatch("email exists");
    done();
  });

  test("try to update trainee with wrong ID", async (done) => {
    const res = await request(app1.app)
      .put("/api/trainee")
      .set("Accept", "application/json")
      .set("Authorization", token)
      .send({
        "dataToUpdate": {
          "name": "hello" },
          "id": "12345" });
    expect(res.body).toHaveProperty("error");
    expect(res.status).toEqual(400);
    expect(res.body.message).toMatch("User not found");
    done();
  });
});
