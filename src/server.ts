import express, { Request, Response} from "express"

import AuthController from "./Controllers/AuthController"
import UserController from "./Controllers/UserController"

const app = express()

app.use(express.json())

app.get("/", (req: Request, res: Response ) => res.send("Hello world"))

app.post("/create", UserController.create)
app.post("/auth", AuthController.authenticate)

app.listen(4000, () => console.log("Server is running 🚀!"))