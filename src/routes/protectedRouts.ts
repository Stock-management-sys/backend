import Express from "express"
import testRouter1 from "./test1.route"

const router = Express.Router()
router.use('/test1', testRouter1)

export default router