const LoginController = require("../Controllers/Login");

const router = require("express").Router();

router.get("/", LoginController.Get);
router.post("/", LoginController.Post);

module.exports = {
    path: "/login",
    router,
};
