// import { config } from "dotenv";
import { configuration } from "../config";
import { Server } from "../Server";
import request from "supertest";

let app1;

describe("Login EndPoint", () => {
  beforeAll(async (done) => {
    const server = new Server(configuration);
    app1 = await server.bootstrap();
    done();
  });

  test("try to run server successfully", async (done) => {
    const res = await request(app1.app)
      .get("/health-check");

    expect(res.status).toEqual(200);
    expect(res.text).toMatch("I am OK");
    done();
  });

  test("try with wrong url", async (done) => {
    const res = await request(app1.app)
      .get("/health");

    expect(res.body).toHaveProperty("error");
    expect(res.body.message).toEqual("Not Found");
    expect(res.status).toEqual(404);
    done();
  });
});
