"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
router.get('/', (requestAnimationFrame, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foodchart = yield prisma.foodChart.findMany();
        res.status(200).json({ success: true, foodchart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
    }
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId, morningMeal, eveningMeal, nightMeal, ingredients, instructions } = req.body;
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
    }
    try {
        const foodchart = yield prisma.foodChart.create({
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
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
    }
}));
router.post('/:patientId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { patientId } = req.params;
    const { morningMeal, eveningMeal, nightMeal, ingredients, instructions } = req.body;
    if (!patientId || !morningMeal || !eveningMeal || !nightMeal) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
    }
    try {
        // Check if the patient exists
        const patient = yield prisma.patient.findUnique({ where: { id: parseInt(patientId) } });
        if (!patient) {
            res.status(404).json({ success: false, message: "Patient not found" });
            return;
        }
        // Create the food chart
        const foodChart = yield prisma.foodChart.create({
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
    }
}));
// Fetch a single food chart by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ success: false, message: "Invalid ID" });
        return;
    }
    try {
        const foodChart = yield prisma.foodChart.findUnique({ where: { id: parseInt(id) } });
        if (!foodChart) {
            res.status(404).json({ success: false, message: "Food chart not found" });
            return;
        }
        res.status(200).json({ success: true, foodChart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
    }
}));
// Update a food chart by ID
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { morningMeal, eveningMeal, nightMeal, ingredients, instructions } = req.body;
    if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ success: false, message: "Invalid ID" });
        return;
    }
    try {
        const updatedFoodChart = yield prisma.foodChart.update({
            where: { id: parseInt(id) },
            data: { morningMeal, eveningMeal, nightMeal, ingredients, instructions },
        });
        res.status(200).json({ success: true, message: "Food chart updated successfully", foodChart: updatedFoodChart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
    }
}));
// Delete a food chart by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ success: false, message: "Invalid ID" });
    }
    try {
        const deletedFoodChart = yield prisma.foodChart.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ success: true, message: "Food chart deleted successfully", foodChart: deletedFoodChart });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ success: false, error: error.message });
        }
        else {
            res.status(500).json({ success: false, error: "An unknown error occurred" });
        }
    }
}));
exports.default = router;
router.put('/food-charts');
