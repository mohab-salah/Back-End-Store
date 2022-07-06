
import client from "../database"
import { json } from "body-parser";
export type Prodect = {
  id: number;
  name: string;
  price: number;
  category: string;
}
export class ProdectStore {
  //=============================get all prodects==============
  async index(): Promise<Prodect[]> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM products"
      const result = await conn.query(sql)
      conn.release()
      return result.rows
    } catch (err) {
      throw new Error(`could not get prodects Error ${err}`)
    }
  }
  //=============================get prodect by id==============
  async show(id:string): Promise<Prodect> {
    try {
      const conn = await client.connect()
      const sql = "SELECT * FROM products WHERE id=($1)"
      const result = await conn.query(sql, [id])
      const product = result.rows[0];
      conn.release()
      return product;
    } catch (err) {
      throw new Error(`could not get prodects by id ${id} Error ${err}`)
    }
  }

  //=============================create new prodect==============
  async create(prod: Prodect): Promise<Prodect> {
    try {
      const conn = await client.connect()
      const sql =
        "INSERT INTO public.products (name, price, category) VALUES($1, $2, $3) RETURNING *"
      const result = await conn.query(sql, [
        prod.name,
        prod.price,
        prod.category,
      ])
      const product = result.rows[0];

      conn.release()
      return product;
    } catch (err) {
      throw new Error(`could not add  prodects  ${JSON.stringify(prod)} Error ${err}`)
    }
  }

  //=============================delete prodect by id==============
  async delete(id: string): Promise<Prodect> {
    try {
      const conn = await client.connect()
      const sql = "DELETE FROM products WHERE id=($1)"
      const result = await conn.query(sql, [id])
      const delprodect = result.rows[0]
      conn.release()
      return delprodect
    } catch (err) {
      throw new Error(`could not get prodects by id ${id} Error ${err}`)
    }
  }
}
