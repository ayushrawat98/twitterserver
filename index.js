import express from "express"
import { sync } from "./models/sync.js"
import { router as PostRouter } from './routes/post.route.js'
import { router as AuthRouter } from './routes/auth.route.js'
import cors from 'cors'
import compression from "compression"
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'
import https from 'https'
import fs from 'fs'

const app = express()
dotenv.config()
sync()

app.use(compression())
if (process.env.NODE_ENV === 'development') {
app.use(cors())
}
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)) , "public/angular/browser"), {cacheControl : true, maxAge : "1h"}));
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)) , "public/files"), {cacheControl : true, maxAge : "1h"}));
app.use(express.json())
app.use('/api/auth', AuthRouter)
app.use('/api', PostRouter)
app.get('*', (req, res, next) =>{
    return res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'angular','browser', 'index.html'))
})


//start server
if (process.env.NODE_ENV === 'development') {
    // create server local
    app.listen(3000, (ex) => {
        console.log(process.env.PORT)
    })
} else if (process.env.NODE_ENV === 'production') {
    const options = {
        key: fs.readFileSync('/etc/letsencrypt/live/khichdi.life/privkey.pem'),
        cert: fs.readFileSync('/etc/letsencrypt/live/khichdi.life/fullchain.pem')
    };
    https.createServer(options, app).listen(443, () => {
        console.log('API server running on https://khichdi.life');
    });
}