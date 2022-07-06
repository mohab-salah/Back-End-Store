import supertest from "supertest"
import app from "../../server"

const req = supertest(app)
let token = ""
describe("authentication API", () => {
  it("return token", async () => {
    const res = await req
      .post("/user/auth")
      .set("Content-type", "Application/json")
      .send({
        firstName: "mohab",
        lastName: "salah",
        password: "password949674",
      })
    expect(res.status).toBe(200)
    token = res.body
  })
})

describe("CRUD APIs", () => {
  it("create new product", async () => {
    const res = await req
      .post("/order/1/product")
      .set("Content-type", "Application/json")
      .set("Authorization", `bearer ${token}`)
      .send({
        quantity: 2,
        productId: 5,
        id: 22
      })
    expect(res.status).toBe(401)
  })
})
describe("test CRUD APIs", () => {
  it(" create new product", async () => {
    const res = await req
      .post("/order")
      .set("Content-type", "Application/json")
      .send({
        status: "active",
        userId: 3,
      })
    expect(res.status).toBe(200)
  })

  it("should get all products", async () => {
    const res = await req.get("/order").set("Content-type", "Application/json")
    expect(res.status).toBe(200)
  })
})
