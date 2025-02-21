import { hash32 } from "farmhash"
import { Hashs } from "../models/hash.model.js"
import fs from 'fs'

export const robot9000 = async (req, res, next) => {
    let hashed = hash32(req.body.content)
    let found =  await Hashs.findOne({
        where : {
            hash : hashed
        }
    })
    if(found){
        // remove file if post is duplicate
        if(req.file){
            fs.unlink('./public/files/' + req.file.filename, () => {})
        }
        return res.status(400).json("Make an original post")
    }else{
        req.hashed = hashed
        next()
    }
}