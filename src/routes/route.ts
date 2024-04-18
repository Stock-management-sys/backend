import Express from "express"
import testRouter from "./test.route"

const router = Express.Router()
router.use('/test', testRouter)

export default router