import Express, { Request, Response } from "express";
import dotenv from "dotenv";
import passport from "passport";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { db } from "./config/db.config";
import unProtectedRouter from "./routes/unProtectedRoutes";
import protectedRouter from "./routes/protectedRouts"
import passportConfig from "./config/passport.config"


dotenv.config();
passportConfig(passport)


const app = Express();
const port = process.env.PORT || 3000;

app.use(passport.initialize())
app.use((req: Request, res: Response, next) => {
  if (req.is('application/x-www-form-urlencoded')) {
    bodyParser.urlencoded({ extended: false })(req, res, next);
  } else {
    next();
  }
});
app.use(Express.json())
app.use(cookieParser())

// database connection
// db.connect((err: Error | null) => {
//   if (err) throw err;
//   console.log("Connected!");
// });

// unprotected router
app.use("/", unProtectedRouter)

// protected routes
app.use("/protected", passport.authenticate("jwt", { session: false }), protectedRouter)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});