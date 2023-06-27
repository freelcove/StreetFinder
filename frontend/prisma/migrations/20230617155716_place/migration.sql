/*
  Warnings:

  - You are about to drop the `places` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `places`;

-- CreateTable
CREATE TABLE `place` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(200) NOT NULL,
    `latitude` DECIMAL(18, 10) NULL,
    `longitude` DECIMAL(18, 10) NULL,
    `city_id` INTEGER NOT NULL,
    `address` VARCHAR(400) NULL,
    `category_id` INTEGER NOT NULL,
    `subcategory_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
