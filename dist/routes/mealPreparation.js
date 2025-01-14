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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
// Fetch the preparation status of all meals
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const meals = yield prisma.mealPreparation.findMany();
        res.status(200).json({ success: true, meals });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error fetching meals" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const newMealPreparation = yield prisma.mealPreparation.create({
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
    }
    catch (error) {
        console.error("Error creating meal preparation:", error);
        res.status(500).json({
            success: false,
            message: "Error creating meal preparation.",
            error: error.message,
        });
    }
}));
// Fetch preparation status for a specific meal
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const meal = yield prisma.mealPreparation.findUnique({ where: { id: parseInt(id) } });
        if (!meal) {
            res.status(404).json({ success: false, message: "Meal not found" });
            return;
        }
        res.status(200).json({ success: true, meal });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error fetching meal" });
    }
}));
// Update preparation status for a meal
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedMeal = yield prisma.mealPreparation.update({ where: { id: parseInt(id) }, data: { status } });
        res.status(200).json({ success: true, updatedMeal });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error updating meal status" });
    }
}));
exports.default = router;
