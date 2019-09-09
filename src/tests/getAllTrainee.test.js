import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { Database } from "../libs";

let app1;
let token;

describe("Sucessfully fetch all trainee details", () => {
  beforeAll(async (done) => {
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    await Database.open(configuration.mongoUri);
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
  test("try to fetch all trainee successfully", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee")
      .set("Authorization", token);
    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("count");
    expect(res.body.data).toHaveProperty("records");
    console.log(1);

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
    console.log(2);

    done();
  });

  test("provide wrong token while fetching trainees", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee")
      .set("Authorization", `${token}ws`);
    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toEqual("Authentication failed");
    expect(res.status).toEqual(401);
    console.log(3);

    done();
  });

  test("provide wrong limit while fetching trainees", async (done) => {
    const res = await request(app1.app)
      .get("/api/trainee/?limit=fnvnv")
      .set("Authorization", token);
    expect(res.body).toHaveProperty("error");
    expect(res.body.error).toEqual("Bad Request");
    expect(res.status).toEqual(400);
    console.log(4);

    done();
  });

});
