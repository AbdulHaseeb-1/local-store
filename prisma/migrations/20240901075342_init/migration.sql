-- CreateEnum
CREATE TYPE "users_role" AS ENUM ('admin');

-- CreateEnum
CREATE TYPE "orders_order_status" AS ENUM ('Pending', 'Confirmed', 'Shipped', 'Delivered', 'Canceled');

-- CreateTable
CREATE TABLE "categories" (
    "categoryId" BIGSERIAL NOT NULL,
    "categoryName" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "imageUrl" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "updated_ata" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("categoryId")
);

-- CreateTable
CREATE TABLE "customers" (
    "customer_id" BIGSERIAL NOT NULL,
    "user_id" BIGINT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "phone_number" VARCHAR(13),
    "shipping_address_id" BIGINT,
    "billing_address_id" BIGINT,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("customer_id")
);

-- CreateTable
CREATE TABLE "images" (
    "image_id" BIGSERIAL NOT NULL,
    "product_id" BIGINT,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "images_pkey" PRIMARY KEY ("image_id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "order_item_id" BIGSERIAL NOT NULL,
    "order_id" BIGINT NOT NULL,
    "product_id" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unit_price" DECIMAL(10,2) NOT NULL,
    "total_price" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" BIGSERIAL NOT NULL,
    "customer" VARCHAR(100) NOT NULL,
    "phone" VARCHAR(11) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "order_address_id" BIGINT,
    "order_status" "orders_order_status" DEFAULT 'Pending',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "order_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "payment_methods" (
    "payment_method_id" BIGSERIAL NOT NULL,
    "payment_method_name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "payment_processor_id" BIGINT,
    "is_active" BOOLEAN DEFAULT true,

    CONSTRAINT "payment_methods_pkey" PRIMARY KEY ("payment_method_id")
);

-- CreateTable
CREATE TABLE "products" (
    "product_id" BIGSERIAL NOT NULL,
    "product_title" VARCHAR(255) NOT NULL,
    "product_description" TEXT NOT NULL,
    "brand_name" VARCHAR(100) NOT NULL,
    "category_id" BIGINT,
    "purchase_price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "selling_price" DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "sold_count" INTEGER NOT NULL DEFAULT 0,
    "product_views" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "admin_id" BIGINT NOT NULL,
    "stock_quantity" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "products_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" BIGSERIAL NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role" "users_role" DEFAULT 'admin',

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "order_address" (
    "order_address_id" BIGSERIAL NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "order_address_pkey" PRIMARY KEY ("order_address_id")
);

-- CreateTable
CREATE TABLE "product_attributes" (
    "attribute_id" BIGSERIAL NOT NULL,
    "attribute_name" VARCHAR(50) NOT NULL,

    CONSTRAINT "product_attributes_pkey" PRIMARY KEY ("attribute_id")
);

-- CreateTable
CREATE TABLE "special_attributes" (
    "id" SERIAL NOT NULL,
    "shipping_fee" INTEGER DEFAULT 0,
    "return_policy" TEXT,
    "delivery_info" VARCHAR(255),

    CONSTRAINT "special_attributes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_attribute_values" (
    "id" BIGSERIAL NOT NULL,
    "product_id" BIGINT NOT NULL,
    "attribute_id" BIGINT NOT NULL,
    "value" VARCHAR(100) NOT NULL,

    CONSTRAINT "product_attribute_values_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "websitevisitors" (
    "VisitorID" SERIAL NOT NULL,
    "IPAddress" VARCHAR(45),
    "VisitTimestamp" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "PageVisited" VARCHAR(255),
    "UserAgent" VARCHAR(255),
    "Referrer" VARCHAR(255),
    "DeviceType" VARCHAR(50),

    CONSTRAINT "websitevisitors_pkey" PRIMARY KEY ("VisitorID")
);

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_key" ON "customers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- CreateIndex
CREATE INDEX "images_product_id_idx" ON "images"("product_id");

-- CreateIndex
CREATE INDEX "order_items_product_id_idx" ON "order_items"("product_id");

-- CreateIndex
CREATE INDEX "order_items_order_id_idx" ON "order_items"("order_id");

-- CreateIndex
CREATE INDEX "orders_order_address_id_idx" ON "orders"("order_address_id");

-- CreateIndex
CREATE UNIQUE INDEX "payment_methods_payment_method_name_key" ON "payment_methods"("payment_method_name");

-- CreateIndex
CREATE INDEX "products_category_id_idx" ON "products"("category_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "product_attributes_attribute_name_key" ON "product_attributes"("attribute_name");

-- CreateIndex
CREATE INDEX "product_attribute_values_attribute_id_idx" ON "product_attribute_values"("attribute_id");

-- CreateIndex
CREATE INDEX "product_attribute_values_product_id_idx" ON "product_attribute_values"("product_id");

-- AddForeignKey
ALTER TABLE "images" ADD CONSTRAINT "images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("order_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_order_address_id_fkey" FOREIGN KEY ("order_address_id") REFERENCES "order_address"("order_address_id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("categoryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("product_id") ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE "product_attribute_values" ADD CONSTRAINT "product_attribute_values_attribute_id_fkey" FOREIGN KEY ("attribute_id") REFERENCES "product_attributes"("attribute_id") ON DELETE RESTRICT ON UPDATE RESTRICT;
