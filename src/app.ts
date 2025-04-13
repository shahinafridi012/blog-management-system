import express, { Application } from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./app/routes";
const app: Application = express();
dotenv.config();

app.use(cors());
app.use(express.json());


app.use(router);


app.get("/", (req, res) => {
  res.send("Blog api heating!");
});

export default app;
