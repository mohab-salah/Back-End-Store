import express, { Request, Response } from "express"
import bodyParser from "body-parser"
import producthandler from "./handler/product-handler-spec"
import orderhandler from "./handler/order-handler-spec"
import userhandler from "./handler/user-handler-spec"
import cors from "cors"

const app: express.Application = express()
const address: string = "127.0.0.1:3000"
const corsoptions = { origin: "http://mohabdomin.com", successStatus: 200 }
app.use(cors(corsoptions))
app.use(bodyParser.json())
app.use("/", producthandler)
app.use("/", userhandler)
app.use("/", orderhandler)

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!")
})

app.listen(3000, function () {
  console.log(`starting app on: ${address}`)
})
export default app
