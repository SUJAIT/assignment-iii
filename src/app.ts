import express, { Request, Response } from 'express'
import authRouter from './modules/auth/auth.route'
import blogRouter from './modules/blog/blog.route'


const app = express()


app.use(express.json())

app.use('/api/auth/',authRouter)
app.use('/api/blogs/',blogRouter)

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Server Live ⚡',
  })
})

app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found'
  })
})



//

export default app
