const {
    MainCategoryGet,
    AddCategory,
    Addlesson,
    DeleteCategories,
    DeleteLesson,
} = require("../Controllers/Category");
const LoginController = require("../Controllers/Login");
const AdminMiddleware = require("../Middlewares/AdminMiddleware");

const router = require("express").Router();

router.post("/create-sub-category", AdminMiddleware, AddCategory);
router.post("/create-lesson", AdminMiddleware, Addlesson);
router.get("/delete-cat/:category_id", AdminMiddleware, DeleteCategories);
router.get("/delete-lesson/:category_id", AdminMiddleware, DeleteLesson);
router.post("/create-lesson", AdminMiddleware, Addlesson);
router.get("/login", LoginController.Get);
router.post("/login", LoginController.Post);
router.get("/:category_id", AdminMiddleware, MainCategoryGet);

module.exports = {
    path: "/",
    router,
};
