import express from "express";
import dotenv from "dotenv";
import dbConnection from "./database/dbConnection.js";
import adminRouter from "./router/adminRouter.js";
import batchRouter from "./router/batchRouter.js";
import studentRouter from "./router/studentRouter.js";
import studentFeeRouter from "./router/studentFeesRouter.js";
import cors from "cors";

const app = express();

dotenv.config();

const port = process.env.PORT || 3000;
dbConnection();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send(`<html>
      <head><title>Inventory</title></head>
      <body>
        <h1>Welcome to Audit</h1>
      </body>
    </html>`);
});

app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/batch", batchRouter);
app.use("/api/v1/student", studentRouter);
app.use("/api/v1/studentFee", studentFeeRouter);

app.listen(port, () => {
  console.log(`App is listening on port: ${port}`);
});

export default app;
