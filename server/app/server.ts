import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

//INITIALIZE SERVER AND OTHER CONFIGS
//CONFIG
dotenv.config();
const app = express();
const port : string = process.env.PORT! || '5000';
app.use(cors());

//MIDDLEWARES
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({
    extended: false
}));

//START SERVER
app.listen(port,() => {
    app.get('/api/chat/health', 
    (req : Request, res : Response) => {
    res.send(`<html><body><center> Server is UP and Running </center></body></html>`)
    })
    console.log(`Server started at http://localhost:${port}`);
});