import supertest from "supertest"
import app from "../../server"
import pool from "../../database"
import { UserStore, User } from "../../models/user"

const userstore = new UserStore()
const req = supertest(app)
let token = ""

describe("test user API EndPoints", () => {
  const user = {
    firstName: "mohab",
    lastName: "salah",
    password: "password1234",
  } as User

  beforeAll(async () => {
    const createdUser = await userstore.create(user)
    user.id = createdUser.id
  })

  afterAll(async () => {
    const conn = await pool.connect()
    const sql = "DELETE FROM users;"
    await conn.query(sql)
    conn.release()
  })

  describe("authentication API", () => {
    it("return token", async () => {
      const res = await req
        .post("/user/auth")
        .set("Content-type", "Application/json")
        .send({
          firstName: "test1",
          lastName: "user1",
          password: "test1235678",
        })
      expect(res.status).toBe(200)
      token = res.body
    })

    it("wrong first name", async () => {
      const res = await req
        .post("/user/auth")
        .set("Content-type", "Application/json")
        .send({
          firstName: "wrong",
          lastName: "user",
          password: "test123678",
        })
      expect(res.status).toBe(200)
    })
  })

  describe("CRUD RESTful API", () => {
    it("create new user", async () => {
      const res = await req
        .post("/user")
        .set("Content-type", "Application/json")
        .send({
          firsName: "test2",
          lastName: "user2",
          password: "test212384794",
        })
      expect(res.status).toBe(200)
    })

    it(" get all users", async () => {
      const res = await req
        .get("/user")
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
      expect(res.status).toBe(200)
    })

    it(" get specific user", async () => {
      const res = await req
        .get(`/user/${user.id}`)
        .set("content-type", "application/json")
        .set("Authorization", `Bearer ${token}`)
      expect(res.status).toBe(200)
    })
  })
})
