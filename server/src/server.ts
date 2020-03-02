import path from 'path';
import express, { Request, Response } from 'express';

const _port = 5555;
const _public = path.join(__dirname, './public');
const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send(`Hello Bitch 🖕 Fuck u`);
});

app.listen(_port, () => { console.log(`SERVER STARTED @ http://localhost:${_port}`); });