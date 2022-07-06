import express from "express"
import { OrderStore, Order } from "../models/orders"
import { UserStore, User } from "../models/user"
import Jwt from "jsonwebtoken"

const router2 = express.Router()
const getCurrentUser = (req: express.Request): User => {
  const authorizationHeader = req.headers.authorization || ""

  const token = authorizationHeader.split(" ")[1]

  const jwtResults = Jwt.verify(token, process.env.token || "")

  return (<any>jwtResults).user
}

const verifyAuthToken = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
): User => {
  try {
    const authheader = req.headers.authorization as string
    const token = authheader.split(" ")[1]
    const jwtresult = Jwt.verify(token, process.env.TOKEN_SECRET as string)
    return (<any>jwtresult).user
    next();
  } catch (err) {
    res.send(401).send("Unauthorized user")
    throw new Error(`401 Unauthorized user Error ${err}`)
  }
}

router2.get(
  "/order",
  verifyAuthToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const currentUserId = getCurrentUser(req).id

      const store = new OrderStore()
      const result = await store.index(currentUserId)
      res.send(result)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)
router2.post(
  "/order",
  verifyAuthToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new OrderStore()

      const ord: Order = req.body

      const result = await store.create(ord)

      res.send(result)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)

router2.post(
  "/order/:id/product",
  verifyAuthToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new OrderStore()

      const orderId: number = parseInt(req.params.id)
      const quantity: number = parseInt(req.body.quantity)
      const productId: number = parseInt(req.body.productId)

      const addedProduct = await store.addedprodect(
        quantity,
        productId,
        orderId
      )

      res.json(addedProduct)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)

export default router2;

