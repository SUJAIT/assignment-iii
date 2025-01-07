import { Router } from 'express'
import { blogController } from './blog.controller'
import auth from '../../middlewares/authChecker/authBlogCheck'
import authUpdate from '../../middlewares/authChecker/authUpdateCheker'
// import authUpdate from '../../middlewares/authChecker/authUpdateCheker'

const blogRouter = Router()

blogRouter.post('/',auth("admin"), blogController.BlogCreate)
blogRouter.patch('/:id',authUpdate("admin"), blogController.BlogUpdate)
// blogRouter.patch('/:id', blogController.BlogUpdate)
// blogRouter.patch('/:id',authUpdate("admin"), blogController.BlogUpdate)

export default blogRouter


