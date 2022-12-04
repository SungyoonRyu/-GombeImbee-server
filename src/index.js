import express from 'express';
import { connectDB } from './db/index.js';
import router from './router/index.js';
import cors from 'cors';

const app = express();
const PORT = process.env.port || 8080;

connectDB();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use("/", router);

const server = app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`);
})
.on("error", (err) => {
    console.error(err);
    process.exit(1);
});

server.timeout = 1000000;