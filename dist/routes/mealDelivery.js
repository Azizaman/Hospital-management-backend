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
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mealDeliveries = yield prisma.mealDelivery.findMany({
            include: {
                foodChart: true,
            },
        });
        res.status(200).json({ success: true, mealDeliveries });
        console.log(req.body);
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
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ success: false, message: "Invalid ID" });
        return;
    }
    try {
        const mealDelivery = yield prisma.mealDelivery.findUnique({
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
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const updatedMealDelivery = yield prisma.mealDelivery.update({
            where: { id: parseInt(id) },
            data: { status, notes },
        });
        res.status(200).json({ success: true, message: "Meal delivery status updated", mealDelivery: updatedMealDelivery });
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
//# sourceMappingURL=mealDelivery.js.map