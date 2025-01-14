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
        const tasks = yield prisma.pantryTask.findMany({
            include: {
                pantryStaff: true,
            },
        });
        res.status(200).json({ success: true, tasks });
        console.log(req.accepted);
    }
    catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pantryStaffId, task, status } = req.body;
    if (!pantryStaffId || !task) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
    }
    try {
        const pantryStaffExists = yield prisma.pantry.findUnique({
            where: { id: pantryStaffId },
        });
        if (!pantryStaffExists) {
            res.status(404).json({ success: false, message: "Pantry staff not found" });
            return;
        }
        const newTask = yield prisma.pantryTask.create({
            data: {
                pantryStaffId,
                task,
                status: status || "pending",
            },
        });
        res.status(201).json({ success: true, newTask });
    }
    catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ success: false, error: error.message || "Error assigning task" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const deletedTask = yield prisma.pantryTask.delete({
            where: { id: parseInt(id) },
        });
        res.status(200).json({ success: true, deletedTask });
    }
    catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ success: false, error: error.message });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const task = yield prisma.pantryTask.findUnique({ where: { id: parseInt(id) } });
        if (!task) {
            res.status(404).json({ success: false, message: "Task not found" });
            return;
        }
        res.status(200).json({ success: true, task });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error fetching task" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const updatedTask = yield prisma.pantryTask.update({ where: { id: parseInt(id) }, data: { status } });
        res.status(200).json({ success: true, updatedTask });
    }
    catch (error) {
        res.status(500).json({ success: false, error: "Error updating task" });
    }
}));
exports.default = router;
//# sourceMappingURL=pantryTasks.js.map