import Express from "express"
import testRouter1 from "./test1.route"
import testRouter2 from "./test2.route"

const router = Express.Router()
router.use('/test1', testRouter1)
router.use('/test2', testRouter2)

export default router