import client from "../database"
export type Order = {
  id: number
  userid: string
  status: string
}
export class OrderStore {
  //==================================get order by userid==============
  async index(userid: number): Promise<Order[]> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM orders WHERE user_id=($1)"
      const result = await conn.query(sql, [userid])
      conn.release()
      return result.rows;
    } catch (err) {
      throw new Error(`could not get order to user ${userid} Error ${err}`)
    }
  }

  //==================================get order by id==============
  async show(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM orders WHERE id=($1)"
      const result = await conn.query(sql, [id])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`could not get order to user ${id} Error ${err}`)
    }
  }
  //==============================create new order==============
  async create(ord: Order): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql =
        "INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *"
      const result = await conn.query(sql, [ord.status, ord.userid])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(`could not create order to prodect ${ord} Error ${err}`)
    }
  }
  //===================================add new prodect===========
  async addedprodect(
    quantity: number,
    productid: number,
    orderid: number
  ): Promise<boolean> {
    try {
      const conn = await client.connect()
      const sql =
        "INSERT INTO order_products ( quantity, order_id, product_id ) VALUES($1, $2, $3) RETURNING *"
      const result = await conn.query(sql, [quantity, orderid, productid])
      conn.release()
      return result.rows[0]
    } catch (err) {
      throw new Error(
        `could not add new prodect to user ${productid} Error ${err}`
      )
    }
  }
  //========================================delete order=============
  async delete(id: string): Promise<Order> {
    try {
      const conn = await client.connect()
      const sql = "DELETE FROM orders WHERE id=($1)"
      const result = await conn.query(sql, [id])
      const delorder = result.rows[0]
      conn.release()
      return delorder
    } catch (err) {
      throw new Error(`could not delete order  ${id} Error ${err}`)
    }
  }
}
