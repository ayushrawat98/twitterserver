import express from "express"
import { sync } from "./models/sync.js"
import { router as PostRouter } from './routes/post.route.js'
import { router as AuthRouter } from './routes/auth.route.js'
import cors from 'cors'
import compression from "compression"

const app = express()
sync()

app.use(compression())
if(process.env.NODE_ENV == 'development'){
    app.use(cors())
}
app.use(express.static(path.join(__dirname, "public/angular")));
app.use(express.json())
app.use('/auth', AuthRouter)
app.use('/', PostRouter)
app.get('*', (req, res, next) =>{
    return res.sendFile(path.join(__dirname, 'public', 'angular', 'index.html'))
})


app.listen(3000, ()=>{})