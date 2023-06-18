-- CreateTable
CREATE TABLE `category` (
    `category_id` INTEGER NOT NULL,
    `category_name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`category_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cities` (
    `city_id` INTEGER NOT NULL,
    `city_name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`city_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `places` (
    `place_id` INTEGER NOT NULL,
    `place_name` VARCHAR(200) NOT NULL,
    `latitude` DECIMAL(18, 10) NULL,
    `longitude` DECIMAL(18, 10) NULL,
    `city_id` INTEGER NOT NULL,
    `place_address` VARCHAR(400) NULL,
    `category_id` INTEGER NOT NULL,
    `subcategory_id` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `updated_at` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`place_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subcategory` (
    `subcategory_id` INTEGER NOT NULL,
    `category_id` INTEGER NOT NULL,
    `subcategory_name` VARCHAR(200) NOT NULL,

    PRIMARY KEY (`subcategory_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
