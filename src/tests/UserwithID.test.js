import request from "supertest";
import config from "./config";

let app1;
let token = null;
let id = null;

describe("Sucessfully fetch logged user details", () => {
  beforeAll(async (done) => {
    app1 = await config.start();
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

  beforeAll(async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", token);
    id = res.body.data.originalID;
    done();
  });

  afterAll(async (done) => {
    await config.close();
    console.log("closed");
    done();
  });

  test("try to fetch user successfully", async (done) => {
    const res = await request(app1.app)
      .get(`/api/user/me/${id}`)
      .set("Authorization", token);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data.name).toEqual("headTrainer");
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
