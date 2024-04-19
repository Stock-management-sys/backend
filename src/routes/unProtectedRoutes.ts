import Express from "express"
import testRouter2 from "./test2.route"
import authRouter from "./auth.route"

const router = Express.Router()
router.use('/test2', testRouter2)
router.use('/', authRouter)

export default router