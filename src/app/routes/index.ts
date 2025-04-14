import { Router } from "express";
import { blogRoutes } from "../modules/blog-management/blog.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();
const moduleRoutes = [
    {
        path: '/api/blogs',
        route: blogRoutes
    },
    {
        path: '/api/auth',
        route: AuthRoutes
    }
];


moduleRoutes.forEach(route => router.use(route.path, route.route));

// 👇 make sure you export this
export default router;
