import { Express,Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Get all patients
router.get("/", async (req, res) => {
    try {
        const patients = await prisma.patient.findMany();
        res.json(patients);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});



// Get all patients
router.get("/", async (req, res) => {
    try {
        const patients = await prisma.patient.findMany();
        res.json(patients);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});

// Add a new patient
router.post("/", async (req, res) => {
    const { name, disease, roomNumber, age, gender,email } = req.body;

    // Validate required fields
    if (!name || !age || !disease || !roomNumber) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
    }

    // Ensure data types are correct (for example, age and roomNumber should be numbers)
    if (typeof age !== "number" || typeof roomNumber !== "number") {
         res.status(400).json({ success: false, message: "Invalid data types for age or roomNumber" });
         return;
    }

    try {
        const patient = await prisma.patient.create({
            data: {
                name,
                disease,
                roomNumber,
                age,
                gender: gender || null,
                email // gender is optional, so we can set it to null if not provided
            },
        });

        res.status(201).json({ success: true, message: "Patient created successfully", patient });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
});


router.put('/:id',async (req,res)=>{
    const {id}=req.params;
    const { name, disease, allergies, roomNumber, age, gender, contactInfo, email } = req.body;
    if (!id || isNaN(parseInt(id))) {
         res.status(400).json({ success: false, message: "Invalid ID" });
      }



    try{
        const updatedPatient =await prisma.patient.update({
            where:{
                id:parseInt(id)
            },
            data:{
                name,
            disease,
            allergies,
            roomNumber,
            email,
            
            
            age,
            gender,
            contactInfo,
            
            }
    
            
        });
        res.status(200).json({ message: 'Patient updated successfully', patient: updatedPatient });

    }
    catch(error){
        res.status(500).json({ message: 'Error updating patient', error });

    }
})


router.delete('/:id',async(req,res)=>{

    const { id } =req.params;
    if (!id || isNaN(parseInt(id))) {
         res.status(400).json({ success: false, message: "Invalid ID" });
      }
    try{
        const  deletedPatient=await prisma.patient.delete({
            where:{
                id:parseInt(id)
            }
        })

        res.status(200).json({ message: 'Patient deleted successfully', patient: deletedPatient });
    }
    catch(error){

        
        res.status(500).json({ message: 'Error deleting patient', error });
          

    }


})


router.get('/:id',async(req,res)=>{
    try{
        const {id}=req.params
        if (!id || isNaN(parseInt(id))) {
             res.status(400).json({ success: false, message: "Invalid ID" });
          }
        const patient=await prisma.patient.findUnique({
            where:{
                id:parseInt(id)
            }
            
        })

        if(!patient){
             res.status(404).json({message: 'Patient not found'});
             return;
        }

        res.status(200).json({message:'patient fetched successfully',patient});
        return;

    }
    catch(error){
        res.status(404).json({message:'error fetching the patient',error});
    }
})


export default router;
