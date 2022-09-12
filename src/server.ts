import express, { Request, Response} from "express"

import AuthController from "./Controllers/AuthController"
import UserController from "./Controllers/UserController"
import AuthMiddleware from "./Middlewares/AuthMiddleware"

const app = express()

app.use(express.json())

app.get("/", AuthMiddleware,(req: Request, res: Response ) => {
    const userId = req.body.userId

    return res.json({userId})
})

app.post("/create", UserController.create)
app.post("/auth", AuthController.authenticate)

app.listen(4000, () => console.log("Server is running 🚀!"))