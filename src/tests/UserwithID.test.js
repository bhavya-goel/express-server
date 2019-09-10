import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { Database } from "../libs";
import { MongoMemoryServer } from "mongodb-memory-server";

let app1;
let token = null;
let id = null;

describe("Sucessfully fetch logged user details", () => {
  beforeAll(async (done) => {
    const mongoServer = new MongoMemoryServer();
    const url = await mongoServer.getConnectionString();
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(url);
    done();
  });

  beforeEach(async (done) => {
    const res = await request(app1.app)
      .post("/api/user/login")
      .set("Accept", "application/json")
      .send({
        "email": "head.trainer@successive.tech",
        "password": "trainer@123" });
    token = res.body.data;
    done();
  });

  beforeEach(async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", token);
    id = res.body.data.originalID;
    done();
  });
  // afterAll(async (done) => {
  //   await app1.close();
  //   console.log("closed");
  //   done();
  // });
  test("try to fetch user successfully", async (done) => {
    const res = await request(app1.app)
      .get(`/api/user/me/${id}`)
      .set("Authorization", token);

    expect(res.body).toHaveProperty("data");
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch("User Details Fetched");
    done();
  });

  test("try not to fetch user by using wrong ID", async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me/12345")
      .set("Authorization", token);

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toEqual("Provide correct ID");
    expect(res.status).toEqual(400);
    done();
  });

});
