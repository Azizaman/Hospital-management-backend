-- CreateTable
CREATE TABLE "Pantry" (
    "id" SERIAL NOT NULL,
    "staffName" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pantry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PantryTask" (
    "id" SERIAL NOT NULL,
    "pantryStaffId" INTEGER NOT NULL,
    "task" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PantryTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealPreparation" (
    "id" SERIAL NOT NULL,
    "foodChartId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealPreparation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MealDelivery" (
    "id" SERIAL NOT NULL,
    "foodChartId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MealDelivery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PantryTask" ADD CONSTRAINT "PantryTask_pantryStaffId_fkey" FOREIGN KEY ("pantryStaffId") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealPreparation" ADD CONSTRAINT "MealPreparation_foodChartId_fkey" FOREIGN KEY ("foodChartId") REFERENCES "FoodChart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MealDelivery" ADD CONSTRAINT "MealDelivery_foodChartId_fkey" FOREIGN KEY ("foodChartId") REFERENCES "FoodChart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
