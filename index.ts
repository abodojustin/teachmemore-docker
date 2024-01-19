import express, { NextFunction, Request, Response } from "express";
import * as dotenv from "dotenv";
dotenv.config();
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import mainRouter from "./src/routes/index";
import { mongoConnector } from "./src/database/connectors/mongoDB";
import fileUpload from "express-fileupload";

const app = express();
app.use(bodyParser.json({ limit: "50mb" })); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

app.use(helmet());
app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

app.use((req, res, next) => {
  // console.log('Incoming Request:', req.method, req.url);
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  
  // console.log('Outgoing Headers:', res.getHeaders());

  next();
});


app.use("/api", mainRouter);

mongoConnector(process.env.MONGO);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
