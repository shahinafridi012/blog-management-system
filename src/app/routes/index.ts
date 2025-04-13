import { Router } from "express";
import { blogRoutes } from "../modules/blog-management/blog.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/api/blogs',
        route: blogRoutes
    }
];


moduleRoutes.forEach(route => router.use(route.path, route.route));

// 👇 make sure you export this
export default router;
