import express from "express"
import { UserStore, User } from "../models/user"
import Jwt from "jsonwebtoken"
import pool from "../database"

const router1 = express.Router()
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
router1.get(
  "/user",
  verifyAuthToken,
  async (_req: express.Request, res: express.Response) => {
    try {
      const store = new UserStore()
      const result = await store.index()
      res.send(result)
    } catch (err) {
      res.status(500).send("there is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)

router1.get(
  "/user/:id",
  verifyAuthToken,
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new UserStore()

      const result = await store.show(req.params.id)

      res.send(result)
    } catch (err) {
      console.log(err)
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)

router1.post("/user", async (req: express.Request, res: express.Response) => {
  try {
    const store = new UserStore()

    const u: User = req.body

    const result = await store.create(u)

    res.send(result)
  } catch (err) {
    res.status(500).send("There is an error")
    throw new Error(`there is an error ${err}`)
  }
})

router1.post(
  "/user/auth",
  async (req: express.Request, res: express.Response) => {
    try {
      const store = new UserStore()

      const { firstName, password } = req.body

      const user = await store.auth(firstName, password)

      const token = Jwt.sign({ user }, process.env.token as string)

      if (!user) {
        return res.status(401).json({
          status: "error",
          msg: "invalid user name or password",
        })
      }
      return res.status(200).json({
        status: "success",
        data: { user, token },
        msg: "valid user",
      })
    } catch (err) {
      res.status(500).send("There is an error")
      throw new Error(`there is an error ${err}`)
    }
  }
)
export default router1
