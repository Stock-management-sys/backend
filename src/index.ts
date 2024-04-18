import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { db } from "./db";
import router from "./routes/route";
import { temp } from "./testfile";

dotenv.config();

db.connect((err: Error | null) => {
  if (err) throw err;
  console.log("Connected!");
});

const app: Express = express();
const port = process.env.PORT || 3000;

// unprotected router
app.use("/", router)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});