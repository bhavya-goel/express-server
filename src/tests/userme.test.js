import request from "supertest";
import config from "./config";

let app1;
let token;

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

  afterAll(async (done) => {
    await config.close();
    console.log("closed");
    done();
  });

  test("try to fetch user successfully", async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", token);

    expect(res.body).toHaveProperty("data");
    expect(res.body.data).toHaveProperty("name");
    expect(res.body.data.name).toEqual("headTrainer");
    expect(res.status).toEqual(200);
    expect(res.body.message).toMatch("User details fetched");
    done();
  });

  test("try not to fetch user by using wrong token", async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", `${token}ws`);

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toEqual("Authentication failed");
    expect(res.status).toEqual(401);
    done();
  });

});
