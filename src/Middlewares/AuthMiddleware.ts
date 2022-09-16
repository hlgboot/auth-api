import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

type TokenPayload = {
    iat: number,
    exp: number,
    id: string
}

function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers

    if(!authorization) { return res.sendStatus(401) }

    const token = authorization.replace("Bearer", "").trim()

    const secret = process.env.SECRET || ""

    try {
        const data = jwt.verify(token, secret)

        const { id } = data as TokenPayload

        req.userId = id
    } catch (err) {
        return res.sendStatus(401)
        // HTTP 401 Unauthorized
    }

    next()
}

export default AuthMiddleware