import express from 'express';
import cors from 'cors';

import taskRoutes from './routes/tasks.routes';
import userRoutes from './routes/users.routes';

const server = express();

server.use(cors());
server.use(express.json());

server.use(taskRoutes);
server.use(userRoutes);

server.listen(5000, () => {
    console.log('listening 5000');
});