import express from "express"
import { sync } from "./models/sync.js"
import { router as PostRouter } from './routes/post.route.js'
import { router as AuthRouter } from './routes/auth.route.js'
import cors from 'cors'
import compression from "compression"
import path from 'path'
import {fileURLToPath} from 'url'
import dotenv from 'dotenv'

const app = express()
dotenv.config()
sync()

app.use(compression())
app.use(cors())
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)) , "public/angular"), {cacheControl : true, maxAge : "1h"}));
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)) , "public/files"), {cacheControl : true, maxAge : "1h"}));
app.use(express.json())
app.use('/api/auth', AuthRouter)
app.use('/api', PostRouter)
app.get('*', (req, res, next) =>{
    return res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'angular', 'index.html'))
})


app.listen(80, ()=>{})