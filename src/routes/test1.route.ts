import Express, { Response, Request } from "express"

const router = Express.Router()

router.get("/", (req: Request, res: Response) => {
    res.json("Hi how are you this is test 1")
})

export default router