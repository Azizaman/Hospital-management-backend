import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();





router.get("/", async (req, res: Response) => {
  try {
    const tasks = await prisma.pantryTask.findMany({
      include: {
        pantryStaff: true, // Include related pantryStaff details
      },
    });

    res.status(200).json({ success: true, tasks });
    console.log(req.accepted)
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { pantryStaffId, task, status } = req.body;

  // Validate required fields
  if (!pantryStaffId || !task) {
    res.status(400).json({ success: false, message: "Missing required fields" });
    return;
  }

  try {
    // Ensure pantryStaffId exists in the Pantry table
    const pantryStaffExists = await prisma.pantry.findUnique({
      where: { id: pantryStaffId },
    });

    if (!pantryStaffExists) {
      res.status(404).json({ success: false, message: "Pantry staff not found" });
      return;
    }

    // Create the task
    const newTask = await prisma.pantryTask.create({
      data: {
        pantryStaffId,
        task,
        status: status || "pending",
      },
    });

    res.status(201).json({ success: true, newTask });
  } catch (error) {
    console.error("Error creating task:", error);
    res.status(500).json({ success: false, error: error.message || "Error assigning task" });
  }
});


router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedTask = await prisma.pantryTask.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ success: true, deletedTask });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});



router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const task = await prisma.pantryTask.findUnique({ where: { id: parseInt(id) } });
    if (!task){
         res.status(404).json({ success: false, message: "Task not found" });
         return;

    } 
    res.status(200).json({ success: true, task });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching task" });
  }
});

// Update task status
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedTask = await prisma.pantryTask.update({ where: { id: parseInt(id) }, data: { status } });
    res.status(200).json({ success: true, updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error updating task" });
  }
});

export default router;
