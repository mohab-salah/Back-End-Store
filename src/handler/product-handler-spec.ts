import express from "express"
import { ProdectStore, Prodect } from "../models/product"
import { UserStore, User } from "../models/user"
import Jwt from "jsonwebtoken"

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
    next()
  } catch (err) {
    res.send(401).send("Unauthorized user")
    throw new Error(`401 Unauthorized user Error ${err}`)
  }
}

const router3 = express.Router()
router3.get(
  "/product",
  async (_req: express.Request, res: express.Response) => {
    try {
      const store = new ProdectStore()

      const result = await store.index()

      res.send(result)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)
router3.get(
  "/product/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new ProdectStore()
      //const reqid=parseInt(req.params.id)
      const result = await store.show(req.params.id)

      res.send(result)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)
router3.get(
  "/product/delete/:id",
  verifyAuthToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new ProdectStore()

      const result = await store.delete(req.params.id)

      res.send(result)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)

router3.post(
  "/product",
  verifyAuthToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new ProdectStore()

      const p: Prodect = req.body

      const result = await store.create(p)

      res.send(result)
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)
export default router3
