import { Request, Response, Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Fetch the delivery status of all meals
router.get("/", async (req: Request, res: Response) => {
  try {
    const mealDeliveries = await prisma.mealDelivery.findMany({
      include: {
        foodChart: true, 
      },
    });
    res.status(200).json({ success: true, mealDeliveries });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "An unknown error occurred" });
    }
  }
});

// Fetch the delivery status for a specific meal
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || isNaN(parseInt(id))) {
     res.status(400).json({ success: false, message: "Invalid ID" });
     return;
  }

  try {
    const mealDelivery = await prisma.mealDelivery.findUnique({
      where: { id: parseInt(id) },
      include: {
        foodChart: true, 
      },
    });

    if (!mealDelivery) {
       res.status(404).json({ success: false, message: "Meal delivery not found" });
       return;
    }

    res.status(200).json({ success: true, mealDelivery });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "An unknown error occurred" });
    }
  }
});

// Update the delivery status of a meal
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, notes } = req.body;

  if (!id || isNaN(parseInt(id))) {
     res.status(400).json({ success: false, message: "Invalid ID" });
     return;
  }

  if (!status) {
     res.status(400).json({ success: false, message: "Delivery status is required" });
     return;
  }

  try {
    const updatedMealDelivery = await prisma.mealDelivery.update({
      where: { id: parseInt(id) },
      data: { status, notes },
    });
    res.status(200).json({ success: true, message: "Meal delivery status updated", mealDelivery: updatedMealDelivery });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "An unknown error occurred" });
    }
  }
});

export default router;
