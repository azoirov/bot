const Router = require("express").Router;
const AdminMiddleware = require("../Middlewares/AdminMiddleware");
const HomeController = require("../Controllers/Home");
const router = Router();

router.get("/", AdminMiddleware, HomeController.Get);
router.post("/main-category", AdminMiddleware, HomeController.MainCategoryPost);

module.exports = {
    path: "/",
    router,
};
