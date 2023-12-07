const { PrismaClient } = require("@prisma/client");
const fs = require("fs");

const prisma = new PrismaClient();

(async () => {
    const data = JSON.parse(fs.readFileSync("data.json", "utf8"));
    for (let i = 0; i < data.length; i++) {
        const { name, description, price, thumbnail, packshot, active } =
            data[i];
        console.log(description);
        await prisma.product.create({
            data: {
                name: name,
                description: description,
                active: active,
                thumbnail: thumbnail,
                packshot: packshot,
                price: price,
            },
        });
    }
})();
