import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import crypto from "crypto"

const prisma = new PrismaClient

class UserController {
    async create(req: Request, res: Response) {
        const { email, password} = req.body 
        // [] Validação para caso esses dados não sejam enviados

        const userExits = await prisma.user.findUnique({
            where: { email }})

        if (userExits) {
            return res.send("Your email is already registered!").status(401)
        }

        const hash = crypto.createHash("sha256", password).digest("hex")

        const user = await prisma.user.create({
            data: {
                email,
                password: hash
            }
        })

        res.send(user)
    }
}

export default new UserController()