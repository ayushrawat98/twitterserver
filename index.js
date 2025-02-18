import express from "express"
import { sync } from "./models/sync.js"
import { router as PostRouter } from './routes/post.route.js'
import { router as AuthRouter } from './routes/auth.route.js'
import cors from 'cors'
import compression from "compression"
import path from 'path'
import {fileURLToPath} from 'url'

const app = express()
sync()

app.use(compression())
if(process.env.NODE_ENV == 'development'){
    app.use(cors())
}
app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)) , "public/angular")));
app.use(express.json())
app.use('/server/auth', AuthRouter)
app.use('/server/', PostRouter)
app.get('*', (req, res, next) =>{
    return res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), 'public', 'angular', 'index.html'))
})


app.listen(3000, ()=>{})