import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req: Request, res: Response) => {
  try {
    const pantry = await prisma.pantry.findMany();
    res.status(200).json({ success: true, pantry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching pantry details" });
  }
});

// Add pantry staff details
router.post("/", async (req: Request, res: Response) => {
  const { staffName, contactInfo, location } = req.body;

  if (!staffName || !contactInfo || !location) {
    res.status(400).json({ success: false, message: "Missing required fields" });
    return;
  }

  try {
    const pantry = await prisma.pantry.create({ data: { staffName, contactInfo, location } });
    res.status(201).json({ success: true, pantry });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error adding pantry staff" });
  }
});

// Fetch pantry staff by ID
router.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const staff = await prisma.pantry.findUnique({ where: { id: parseInt(id) } });
    if (!staff) {
      res.status(404).json({ success: false, message: "Staff not found" });
      return;
    }
    res.status(200).json({ success: true, staff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error fetching pantry staff" });
  }
});

// Update pantry staff details
router.put("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { staffName, contactInfo, location } = req.body;

  try {
    const updatedStaff = await prisma.pantry.update({
      where: { id: parseInt(id) },
      data: { staffName, contactInfo, location },
    });
    res.status(200).json({ success: true, updatedStaff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error updating staff details" });
  }
});

// Delete pantry staff by ID
router.delete("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedStaff = await prisma.pantry.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ success: true, message: "Staff deleted", deletedStaff });
  } catch (error) {
    res.status(500).json({ success: false, error: "Error deleting staff" });
  }
});

export default router;
