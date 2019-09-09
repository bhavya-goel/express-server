import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";
import { Database } from "../libs";

let app1;
let token;

describe("Sucessfully fetch logged user details", () => {
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
  test("try to fetch user successfully", async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", token);
    expect(res.body).toHaveProperty("data");
    console.log(1);

    done();
  });

  test("try not to fetch user by using wrong token", async (done) => {
    const res = await request(app1.app)
      .get("/api/user/me")
      .set("Authorization", `${token}ws`);
    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toEqual("Authentication failed");
    expect(res.status).toEqual(401);
    console.log(2);

    done();
  });

});
