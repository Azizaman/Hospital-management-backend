import {  PrismaClient } from '@prisma/client';
import express from 'express';


const router=express.Router();
const prisma= new PrismaClient();

router.get('/',async(req,res)=>{

    try{
        const foodchart=await prisma.foodChart.findMany();
    res.status(200).json({success: true, foodchart });
    console.log(req.body)

    }
    catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ success: false, error: error.message });
        } else {
          res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
      }
    

});

router.post('/',async(req,res)=>{
    const {patientId, morningMeal, eveningMeal, nightMeal, ingredients, instructions}=req.body;
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
         res.status(400).json({ success: false, message: "Missing required fields" });
         return;
      }
      try{
        const foodchart=await prisma.foodChart.create({
            data: {
                patientId,
                morningMeal,
                eveningMeal,
                nightMeal,
                ingredients,
                instructions,
              },

        });
        res.status(201).json({ success: true, message: "Food chart created successfully", foodchart });
      }
      catch (error: unknown) {
        if (error instanceof Error) {
          res.status(500).json({ success: false, error: error.message });
        } else {
          res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
      }
});

router.post('/:patientId',async(req,res)=>{
    const {patientId}=req.params;
    const { morningMeal, eveningMeal, nightMeal, ingredients, instructions}=req.body;
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
         res.status(400).json({ success: false, message: "Missing required fields" });
         return;
      }

      try{
        // Check if the patient exists
    const patient = await prisma.patient.findUnique({ where: { id: parseInt(patientId) } });

    if (!patient) {
       res.status(404).json({ success: false, message: "Patient not found" });
       return;
    }

    // Create the food chart
    const foodChart = await prisma.foodChart.create({
      data: {
        patientId: parseInt(patientId), // Link to the specific patient
        morningMeal,
        eveningMeal,
        nightMeal,
        ingredients,
        instructions,
      },
    });

    res.status(201).json({ success: true, message: "Food chart created successfully", foodChart });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ success: false, error: error.message });
    } else {
      res.status(500).json({ success: false, error: "An unknown error occurred" });
    }
  }
      

});


// Fetch a single food chart by ID
router.get("/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id || isNaN(parseInt(id))) {
       res.status(400).json({ success: false, message: "Invalid ID" });
       return;
    }
  
    try {
      const foodChart = await prisma.foodChart.findUnique({ where: { id: parseInt(id) } });
      if (!foodChart) {
         res.status(404).json({ success: false, message: "Food chart not found" });
         return;
      }
      res.status(200).json({ success: true, foodChart });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "An unknown error occurred" });
      }
    }
  });
  
  // Update a food chart by ID
  router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { morningMeal, eveningMeal, nightMeal, ingredients, instructions } = req.body;
  
    if (!id || isNaN(parseInt(id))) {
      res.status(400).json({ success: false, message: "Invalid ID" });
      return;
    }
  
    try {
      const updatedFoodChart = await prisma.foodChart.update({
        where: { id: parseInt(id) },
        data: { morningMeal, eveningMeal, nightMeal, ingredients, instructions },
      });
      res.status(200).json({ success: true, message: "Food chart updated successfully", foodChart: updatedFoodChart });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "An unknown error occurred" });
      }
    }
  });
  
  // Delete a food chart by ID
  router.delete("/:id", async (req, res) => {
    const { id } = req.params;
  
    if (!id || isNaN(parseInt(id))) {
       res.status(400).json({ success: false, message: "Invalid ID" });
    }
  
    try {
      const deletedFoodChart = await prisma.foodChart.delete({ where: { id: parseInt(id) } });
      res.status(200).json({ success: true, message: "Food chart deleted successfully", foodChart: deletedFoodChart });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "An unknown error occurred" });
      }
    }
  });
  
  export default router;
  

router.put('/food-charts')

