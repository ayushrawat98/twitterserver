import sharp from "sharp"
import fs from 'fs'

export function compressImage(req, res, next) {
    if (req.file) {
        let file = req.file
        if (file.mimetype.includes('image') && file.mimetype != 'image/gif') {
            sharp(fs.readFileSync('./public/files/' + file.filename)).jpeg({ quality: 70 }).toFile('./public/files/' + file.filename)
        }
    }
    next()
}