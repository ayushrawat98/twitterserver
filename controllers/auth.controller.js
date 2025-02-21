import { Users } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function loginUser(req, res, next) {
    if (notEmptyBody(req)) return res.status(400).json({ message: 'Username/password is required' })

    let User = await Users.findOne({ where: { username: req.body.username } })

    if (User) {
        if (!(await bcrypt.compare(req.body.password, User.password))) {
            return res.status(400).json({ message: "Password doesn't match" })
        } else {
            return res.status(200).json({ token: generateToken({ id: User.id, username: User.username }) })
        }
    } else {
        return res.status(404).json({ message: "User not found" })
    }
}

export async function registerUser(req, res, next) {
    if (notEmptyBody(req)) return res.status(400).json({ message: 'Username/password is required' })

    let hashedPassword = await bcrypt.hash(req.body.password, 1)

    try {
        let User = await Users.create({ username: req.body.username.toLowerCase(), displayname: req.body.displayname, password: hashedPassword });
        return res.status(200).json({ message: "Registered", token: generateToken({ id: User.id, username: User.username }) })
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

function generateToken(data) {
    return jwt.sign(data, "test", { expiresIn: '12h' })
}

function notEmptyBody(req) {
    if (!req.body.username || !req.body.password || typeof req.body.username != 'string' || typeof req.body.password != 'string') {
        return true
    }
}

