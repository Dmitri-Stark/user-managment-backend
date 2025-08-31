import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import userRoutes from './routes/userRoutes';
import groupRoutes from './routes/groupRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/groups', groupRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API Base URL: http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET    http://localhost:${PORT}/api/users?limit=10&offset=0`);
  console.log(`   GET    http://localhost:${PORT}/api/groups?limit=10&offset=0`);
  console.log(`   DELETE http://localhost:${PORT}/api/groups/remove-user`);
  console.log(`   PATCH  http://localhost:${PORT}/api/users/statuses`);
  console.log(`🗄️  Database: http://localhost:8080 (user/password)`);
});