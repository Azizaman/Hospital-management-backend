-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "disease" TEXT,
    "allergies" TEXT,
    "roomNumber" INTEGER NOT NULL,
    "bedNumber" INTEGER NOT NULL,
    "floorNumber" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "contactInfo" TEXT NOT NULL,
    "emergencyContact" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FoodChart" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "morningMeal" TEXT NOT NULL,
    "eveningMeal" TEXT NOT NULL,
    "nightMeal" TEXT NOT NULL,
    "instructions" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "FoodChart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "foodChartId" INTEGER NOT NULL,
    "deliveryTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_foodChartId_key" ON "Delivery"("foodChartId");

-- AddForeignKey
ALTER TABLE "FoodChart" ADD CONSTRAINT "FoodChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Delivery" ADD CONSTRAINT "Delivery_foodChartId_fkey" FOREIGN KEY ("foodChartId") REFERENCES "FoodChart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
