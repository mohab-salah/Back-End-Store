import { type, userInfo } from "os"
import client from "../database"
import bcrypt from "bcrypt"

export type User = {
  id: number,
  firstName: string,
  lastName: string,
  password: string
}
const { SALT_ROUNDS, BCRYPT_PASSWORD } = process.env

export class UserStore {
  //======================to show useres=================

  async index(): Promise<User[]> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM users"
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`user not found ${err}`)
    }
  }
  //======================to show usere with id=================
  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM users WHERE id=($1)"
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`can not find the user with id=${id}  . Error ${err}`)
    }
  }
  //====================== to create new user===============
  async create(u: User): Promise<User> {
    try {
      const conn = await client.connect()
      const sql =
        "INSERT INTO users (first_name, last_name, password) VALUES($1, $2, $3) RETURNING *"
      const hash = bcrypt.hashSync(
        u.password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string)
      )

      const result = await conn.query(sql, [u.firstName, u.lastName, hash])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `could not add user ${u.firstName} ${u.lastName} . Error ${err}`
      )
    }
  }
  //======================to delete user from database=============
  async delete(id: string): Promise<User> {
    try {
      const conn = await client.connect()
      const sql = "DELETE FROM users WHERE id=($1)"
      const result = await conn.query(sql, [id])
      const deluser = result.rows[0]
      conn.release()
      return deluser
    } catch (err) {
      throw new Error(`could not deleted user with id ${id} Error ${err}`)
    }
  }
  //======================To verify the user=======================
  async auth(firstName: string, password: string): Promise<User | null> {
    try {
      const conn = await client.connect()
      const sql = "SELECT password FROM users WHERE first_name=($1)"
      const result = await conn.query(sql, [firstName])
      if (result.rows.length) {
        const user = result.rows[0]
        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user
        }
      }
      conn.release()
      return null
    } catch (err) {
      throw new Error(`something is wrong Error ${err}`)
    }
  }
}
