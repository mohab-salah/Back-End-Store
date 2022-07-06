import { ProdectStore, Prodect } from "../product"
import pool from "../../database"
const productStore = new ProdectStore()

describe("Product Functions", () => {
  it(" index function", async () => {
    expect(productStore.index).toBeDefined()
  })
  it(" show function", async () => {
    expect(productStore.show).toBeDefined()
  })
  it(" create function", async () => {
    expect(productStore.create).toBeDefined()
  })
  it(" delete function", async () => {
    expect(productStore.delete).toBeDefined()
  })
})

describe("test create product function", () => {
  beforeAll(async () => {
    const product = {
      name: 'product testing1',
      price: 112,
      category: 'category test1',
    } as Prodect;

    const createdProduct = await productStore.create(product);
  });

  const product = {
    name: 'product test',
    price: 111,
    category: 'category test',
  } as Prodect;



  it('show method should return a specific product', async () => {

    const createdProduct = await productStore.create(product);
    expect(createdProduct).toEqual(createdProduct);
  });

  it("index method should get all products", async () => {
    const products = await productStore.index();
    expect(products.length).toBeGreaterThanOrEqual(0);
  });
  it('show method should return a specific product', async () => {
    const testProduct = {
      name: 'product test',
      price: 111,
      category: 'category test',
    } as Prodect;
    const createdProduct = await productStore.create(testProduct);
    const product = await productStore.show(createdProduct.id.toString());
    expect(createdProduct.id).toEqual(product.id);
  });

})

