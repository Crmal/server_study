import { Router } from 'express';

import authRouter from './auth';
import postsRouter from './posts';

const app = Router();

app.use('/posts', postsRouter);
app.use('/auth', authRouter);

export default app