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
        const pantry = yield prisma.pantry.findMany();
        res.status(200).json({ success: true, pantry });
        console.log(req.body);
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error fetching pantry details" });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { staffName, contactInfo, location } = req.body;
    if (!staffName || !contactInfo || !location) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
    }
    try {
        const pantry = yield prisma.pantry.create({ data: { staffName, contactInfo, location } });
        res.status(201).json({ success: true, pantry });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error adding pantry staff" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const staff = yield prisma.pantry.findUnique({ where: { id: parseInt(id) } });
        if (!staff) {
            res.status(404).json({ success: false, message: "Staff not found" });
            return;
        }
        res.status(200).json({ success: true, staff });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error fetching pantry staff" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { staffName, contactInfo, location } = req.body;
    try {
        const updatedStaff = yield prisma.pantry.update({
            where: { id: parseInt(id) },
            data: { staffName, contactInfo, location },
        });
        res.status(200).json({ success: true, updatedStaff });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error updating staff details" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedStaff = yield prisma.pantry.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ success: true, message: "Staff deleted", deletedStaff });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error deleting staff" });
    }
}));
exports.default = router;
//# sourceMappingURL=pantry.js.map