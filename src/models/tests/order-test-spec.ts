import { OrderStore, Order } from "../orders"
import { UserStore, User } from "../user"
import { ProdectStore, Prodect } from "../product"
import pool from "../../database"


const orderStore = new OrderStore()
const productStore = new ProdectStore()
const userStore = new UserStore()

describe("Orders Functions", () => {
  it("get order by userid", async () => {
    expect(orderStore.index).toBeDefined()
  })

  it("get order by id", async () => {
    expect(orderStore.show).toBeDefined()
  })

  it("create way", async () => {
    expect(orderStore.create).toBeDefined()
  })

  it(" addedprodect way", async () => {
    expect(orderStore.addedprodect).toBeDefined()
  })
})
//=============================================
describe("Test Create Order Function", () => {
  const order = {
    userid: "-1",
    status: "order test"
  } as Order;

  const user = {
    firstName: "mohab",
    lastName: "salah",
    password: "category1",
  } as User;

  const product = {
    name: "product test",
    price: 111,
    category: "category1",
  } as Prodect;

  beforeAll(async () => {
    const createUser = await userStore.create(user);
    user.id = createUser.id;
    order.userid = createUser.id.toString();

    const createProduct = await productStore.create(product);
    product.id = createProduct.id;

    const createOrder = await orderStore.create(order);
    order.id = createOrder.id;
  });

  afterAll(async () => {
    const conn = await pool.connect();
    await conn.query('DELETE FROM order_products');
    await conn.query('DELETE FROM orders');
    await conn.query('DELETE FROM products');
    await conn.query('DELETE FROM users');
    conn.release();
  });

  it(" should return all orders", async () => {
    const ordersList = await orderStore.index(user.id);
    expect(order.id).toBeGreaterThanOrEqual(0);
  });

  it(" should create a new order", async () => {
    const testOrder = {
      userid: user.id.toString(),
      status: "active"
    } as Order;

    const createOrder = await orderStore.create(testOrder);

    expect(createOrder.id).toBeGreaterThan(0);
  });

  it("should return a specific order", async () => {
    const testOrder = {
      userid: user.id.toString(),
      status: "active"
    } as Order;

    const createOrder = await orderStore.create(testOrder);
    const order = await orderStore.show(createOrder.id.toString());
    expect(createOrder.id).toEqual(order.id);
  });


});