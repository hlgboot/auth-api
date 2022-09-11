import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

class AuthController {
    async authenticate(req: Request, res: Response) {
        const { email, password } = req.body

        const user = await prisma.user.findUnique({
            where: {email} })

        if(!user) { return res.send("User not found!") }

        const IsPasswordValid = await bcrypt.compare(password, user.password)

        if(!IsPasswordValid) { return res.send("Incorrect password!") }

        const secret = process.env.SECRET || ""

        const token = jwt.sign({ id: user.id}, secret, {expiresIn: "1d"})

        return res.json(token)
    }
}

export default new AuthController()