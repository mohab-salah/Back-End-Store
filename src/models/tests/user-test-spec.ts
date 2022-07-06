import { UserStore, User } from "../user"
import pool from "../../database"

const userStore = new UserStore()

describe("Users Functions", () => {
  it("show all users", async () => {
    expect(userStore.index).toBeDefined()
  })
  it("show custom user", async () => {
    expect(userStore.show).toBeDefined()
  })
  it("create user", async () => {
    expect(userStore.create).toBeDefined()
  })
})

describe("Test Create User function", () => {
  const user = {
    firstName: "mohab",
    lastName: "salah",
    password: "category1",
  } as User

  beforeAll(async () => {
    const createuser = await userStore.create(user)
    user.firstName = createuser.firstName
  })

  afterAll(async () => {
    const conn = await pool.connect()
    const sql = "DELETE FROM users"
    await conn.query(sql)
    conn.release()
  })

  it("return all users", async () => {
    const usersList = await userStore.index()
    expect(usersList.length).toBeGreaterThan(0)
  })

  it(" return a new user", async () => {
    const testuser = {
      firstName: "new firstname",
      lastName: "new lastname",
      password: "category2",
    } as User

    const createduser = await userStore.create(testuser)

    expect(createduser.id).toBeGreaterThan(0)
  })

  it('show method should return a specific user', async () => {
    const testuser = {
      firstName: 'mohab',
      lastName: 'salah',
      password: 'category1',
    } as User;

    const createduser = await userStore.create(testuser);

    const user = await userStore.show(createduser.id.toString());

    expect(createduser.id).toEqual(user.id);
  });
})
