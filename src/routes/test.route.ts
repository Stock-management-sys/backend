import Express from "express"
import { Response } from "express"
import { Request } from "express"

const router = Express.Router()

router.get("/", (req: Request, res: Response) => {
    res.json("Hi how are you this is test")
})

export default router