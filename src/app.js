const express = require("express");
const { PrismaClient } = require("@prisma/client");
const fs = require("fs");
const dotenv = require("dotenv");
const cors = require("cors");
const errorHandler = require("./middlewares/errorsHandling");
const config = require("./config");
const routes = require("./routes");

dotenv.config();

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// cors
app.use(
    cors({
        origin: config.frontend_url,
    })
);

//access to public folder
app.use(express.static(__dirname + "/public"));

// initial route
app.get("/", (req, res) => {
    res.send({ message: "Welcome to app-store-api application." });
});

// api routes prefix
app.use("/api", routes);

// error handling
app.use(errorHandler);

// run server
app.listen(config.port, () => {
    console.log("server launch");
});

(async () => {
    const data = JSON.parse(fs.readFileSync("./migrate/data.json", "utf8"));
    const prisma = new PrismaClient();
    for (let i = 0; i < data.length; i++) {
        const { name, description, price, active, image_path } =
            data[i];
        await prisma.product.create({
            data: {
                name: name,
                description: description,
                active: active,
                price: price,
                image_path: image_path
            },
        });
    }
})();

module.exports = app;
