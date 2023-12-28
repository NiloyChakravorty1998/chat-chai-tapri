import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import http from 'http'; 
import { Server } from 'socket.io'; 
import path from 'path';

dotenv.config();

const app = express();
const server = http.createServer(app); 
const io = new Server(server); 

const port: string = process.env.SERVER_PORT!;
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(cors());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({
    policy: "cross-origin"
}));
app.use(morgan("common"));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Serve your HTML, CSS, or other static files if needed
app.use(express.static('public'));

// Define a route for checking the health of the server
app.get('/api/chat/health', (req: Request, res: Response) => {
    res.send(`<html><body><center> Server is UP and Running </center></body></html>`);
});

// Socket.IO connection event
io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Handle chat messages
    socket.on('chat message', (msg) => {
        console.log('Message from client:', msg);

        // Broadcast the message to all connected clients
        io.emit('chat message', msg);
    });

    // Handle disconnect
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
