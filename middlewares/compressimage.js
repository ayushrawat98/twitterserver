import sharp from "sharp"
import fs from 'fs'

export function compressImage(req, res, next) {
    if (req.file) {
        if (req.file.mimetype.includes('image') && req.file.mimetype != 'image/gif') {
            sharp(fs.readFileSync('./public/files/' + req.file.filename)).jpeg({ quality: 40 }).toFile('./public/files/' + req.file.filename)
        }
    }
    next()
}