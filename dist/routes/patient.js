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
        const patients = yield prisma.patient.findMany();
        console.log(req.path, patients);
        res.json(patients);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const patients = yield prisma.patient.findMany();
        res.json(patients);
        console.log(req.headers);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, disease, roomNumber, age, gender, email } = req.body;
    if (!name || !age || !disease || !roomNumber) {
        res.status(400).json({ success: false, message: "Missing required fields" });
        return;
    }
    if (typeof age !== "number" || typeof roomNumber !== "number") {
        res.status(400).json({ success: false, message: "Invalid data types for age or roomNumber" });
        return;
    }
    try {
        const patient = yield prisma.patient.create({
            data: {
                name,
                disease,
                roomNumber,
                age,
                gender: gender || null,
                email
            },
        });
        res.status(201).json({ success: true, message: "Patient created successfully", patient });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, disease, allergies, roomNumber, age, gender, contactInfo, email } = req.body;
    if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ success: false, message: "Invalid ID" });
    }
    try {
        const updatedPatient = yield prisma.patient.update({
            where: {
                id: parseInt(id)
            },
            data: {
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
    catch (error) {
        res.status(500).json({ message: 'Error updating patient', error });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!id || isNaN(parseInt(id))) {
        res.status(400).json({ success: false, message: "Invalid ID" });
    }
    try {
        const deletedPatient = yield prisma.patient.delete({
            where: {
                id: parseInt(id)
            }
        });
        res.status(200).json({ message: 'Patient deleted successfully', patient: deletedPatient });
    }
    catch (error) {
        res.status(500).json({ message: 'Error deleting patient', error });
    }
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        if (!id || isNaN(parseInt(id))) {
            res.status(400).json({ success: false, message: "Invalid ID" });
        }
        const patient = yield prisma.patient.findUnique({
            where: {
                id: parseInt(id)
            }
        });
        if (!patient) {
            res.status(404).json({ message: 'Patient not found' });
            return;
        }
        res.status(200).json({ message: 'patient fetched successfully', patient });
        return;
    }
    catch (error) {
        res.status(404).json({ message: 'error fetching the patient', error });
    }
}));
exports.default = router;
//# sourceMappingURL=patient.js.map