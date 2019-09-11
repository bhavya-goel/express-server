import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { Database } from "../libs";
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

  test("try to fetch all trainee successfully", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee")
      .set("Authorization", token);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("count");
    expect(res.body.data).toHaveProperty("records");
    done();
  });

  test("try to fetch all trainee with limit", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee/?limit=1")
      .set("Authorization", token);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("count");
    expect(res.body.data).toHaveProperty("records");
    expect(res.body.data.records.length).toBeLessThanOrEqual(1);
    done();
  });

  test("try to fetch all trainee with limit and skip", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee/?limit=1&skip=0")
      .set("Authorization", token);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("count");
    expect(res.body.data).toHaveProperty("records");
    expect(res.body.data.records.length).toBeLessThanOrEqual(1);
    done();
  });

  test("provide wrong token while fetching trainees", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee")
      .set("Authorization", `${token}ws`);

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toEqual("Authentication failed");
    expect(res.status).toEqual(401);
    done();
  });

  test("provide wrong limit while fetching trainees", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee/?limit=fnvnv")
      .set("Authorization", token);

    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Bad Request");
    expect(res.status).toEqual(400);
    done();
  });

});
