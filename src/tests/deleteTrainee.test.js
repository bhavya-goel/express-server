import { configuration } from "../config";
import { Database } from "../libs";
import { Server } from "../Server";
import request from "supertest";
import { userModel } from "../repositories/user/UserModel";
import { MongoMemoryServer } from "mongodb-memory-server";

let app1;
let token;

describe("Sucessfully delete trainee ", () => {
  beforeAll(async (done) => {
    const mongoServer = new MongoMemoryServer();
    const url = await mongoServer.getConnectionString();
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(url);
    userModel.deleteMany({role: "trainee"});
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
  // afterAll(async (done) => {
  //   await app1.close();
  //   console.log("closed");
  //   done();
  // });
  test("try to delete trainee successfully", async (done) => {

    // creating a trainee to be deleted
    const res = await request(app1.app)
      .post("/api/trainee")
      .set("Authorization", token)
      .set("Accept", "application/json")
      .send({
          "email": "abc@successive.tech",
          "name": "abc",
          "password": "abc" });
    const id = res.body.data.originalID;

    // deleting trainee with above id
    const res1 = await request(app1.app)
      .delete(`/api/trainee/${id}`)
      .set("Accept", "application/json")
      .set("Authorization", token);

    expect(res1.body).toHaveProperty("data");
    expect(res1.status).toEqual(200);
    expect(res1.body.message).toMatch("Trainee Deleted Successfully");
    done();
  });

  test("try to delete trainee with wrong ID", async (done) => {

    // deleting trainee with wrong ID
    const res = await request(app1.app)
      .delete(`/api/trainee/12345`)
      .set("Accept", "application/json")
      .set("Authorization", token);

    expect(res.body).toHaveProperty("error");
    expect(res.status).toEqual(400);
    expect(res.body.message).toMatch("User not found");
    done();
  });

});
