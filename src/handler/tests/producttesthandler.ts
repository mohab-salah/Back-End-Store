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
      .post("/product")
      .set("Content-type", "Application/json")
      .set("Authorization", `bearer ${token}`)
      .send({
        name: "22",
        price: 55,
      })
    expect(res.status).toBe(401)
  })

  it("get all products", async () => {
    const res = await req
      .get("/product")
      .set("Content-type", "Application/json")
    expect(res.status).toBe(200)
  })

  it("get all products to custom id", async () => {
    const res = await req
      .get(`/product/1`)
      .set("Content-type", "Application/json")
    expect(res.status).toBe(200)
  })

  it("Delete products to custom id", async () => {
    const res = await req
      .post(`/product/delete/1`)
      .set("Content-type", "Application/json")
    expect(res.status).toBe(200)
  })
})
