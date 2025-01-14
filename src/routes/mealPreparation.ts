import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Fetch the preparation status of all meals
router.get("/", async (req: Request, res: Response) => {
  try {
    const meals = await prisma.mealPreparation.findMany();
    res.status(200).json({ success: true, meals });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching meals" });
  }
});


router.post("/", async (req, res) => {
  const { foodChartId, status = "pending", notes } = req.body;

  // Validate input
  if (!foodChartId) {
     res.status(400).json({
      success: false,
      message: "Food Chart ID is required.",
    });
    return;
  }

  try {
    // Create a new MealPreparation entry
    const newMealPreparation = await prisma.mealPreparation.create({
      data: {
        foodChartId, // Required field, must be a valid FoodChart ID
        status, // Default to "pending" if not provided
        notes, // Optional field
      },
      include: {
        foodChart: true, // Include the related FoodChart details if needed in the response
      },
    });

    // Respond with success and the new entry
    res.status(201).json({
      success: true,
      message: "Meal Preparation created successfully.",
      mealPreparation: newMealPreparation,
    });
  } catch (error) {
    console.error("Error creating meal preparation:", error);
    res.status(500).json({
      success: false,
      message: "Error creating meal preparation.",
      error: error.message,
    });
  }
});



// Fetch preparation status for a specific meal
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const meal = await prisma.mealPreparation.findUnique({ where: { id: parseInt(id) } });
    if (!meal) {
        res.status(404).json({ success: false, message: "Meal not found" });
        return;

    } 
    res.status(200).json({ success: true, meal });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching meal" });
  }
});

// Update preparation status for a meal
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedMeal = await prisma.mealPreparation.update({ where: { id: parseInt(id) }, data: { status } });
    res.status(200).json({ success: true, updatedMeal });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error updating meal status" });
  }
});

export default router;
