const Express = require("express");
const Fs = require("fs");
const Path = require("path");
const config = require("../../config");
const CookieParser = require("cookie-parser");
const db = require("../Model/postgres");
const bot = require("../../main");

async function server() {
    let postgres = await db();
    await bot(postgres);

    // Create Server
    const app = Express();
    app.listen(config.PORT, () => console.log("SERVER READY"));

    // Middlewares
    app.use(Express.urlencoded({ extended: true }));
    app.use(Express.json());
    app.use(Express.static(Path.join(__dirname, "Public")));

    app.use((req, res, next) => {
        req.psql = postgres;
        next();
    });

    app.use(CookieParser());

    // Settings
    app.set("view engine", "ejs");
    app.set("views", Path.join(__dirname, "Views"));

    // Connecting Routes
    const routesPath = Path.join(__dirname, "Routes");
    Fs.readdir(routesPath, async (err, files) => {
        if (files) {
            for await (let file of files) {
                const Route = require(Path.join(__dirname, "Routes", file));

                if (Route.path && Route.router) {
                    app.use(Route.path, Route.router);
                }
            }
        }
    });
}

server().then();
