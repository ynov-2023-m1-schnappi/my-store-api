-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT false,
    "thumbnail" TEXT NOT NULL,
    "packshot" TEXT NOT NULL DEFAULT '/uploads/',
    "price" DECIMAL(65,30) NOT NULL DEFAULT 0.000000000000000000000000000000,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
