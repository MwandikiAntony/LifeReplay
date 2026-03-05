import express, { Request, Response } from "express";
import startSocketServer from "./ws/socketServer";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("LifeReplay backend running");
});

app.listen(4000, () => {
  console.log("HTTP server running on port 4000");
});

startSocketServer();