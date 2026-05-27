import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import aiRoutes from './routes/ai.routes';
import chatRoutes from "./routes/chat.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/ai', aiRoutes);
// test route
app.get('/', (req, res) => {
  res.send('API Running');
});
app.use("/api/chat", chatRoutes);

export default app;