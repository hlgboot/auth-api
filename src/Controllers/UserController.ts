import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import bcrypt from "bcrypt"

const prisma = new PrismaClient()

class UserController {
    async create(req: Request, res: Response) {
        const { email, password} = req.body 
        // [] Validação para caso esses dados não sejam enviados

        const userExits = await prisma.user.findUnique({
            where: { email }})

        if (userExits) {
            return res.send("Your email is already registered!")
        }

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const user = await prisma.user.create({
            data: {
                email,
                password: hash
            }
        })

        return res.send(user)
    }
}

export default new UserController()