import { Router } from "express";

import userRoutes from "./user.routes.js";
import authRoutes from "./auth.routes.js";
import newsRoutes from "./news.routes.js";

const router = Router();

router.use('/user', userRoutes);
router.use('/auth', authRoutes);
router.use('/news', newsRoutes);

export default router;