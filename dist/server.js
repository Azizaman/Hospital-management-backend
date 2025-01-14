"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pantry_1 = __importDefault(require("./routes/pantry"));
const pantryTasks_1 = __importDefault(require("./routes/pantryTasks"));
const mealPreparation_1 = __importDefault(require("./routes/mealPreparation"));
const mealDelivery_1 = __importDefault(require("./routes/mealDelivery"));
const authMiddleware_1 = require("./middleware/authMiddleware");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const patient_1 = __importDefault(require("./routes/patient"));
const foodChart_1 = __importDefault(require("./routes/foodChart"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/auth', authRoutes_1.default);
app.use('/patient', authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['manager', 'pantry', 'delivery']), patient_1.default);
app.use("/pantry", authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['manager']), pantry_1.default);
app.use("/pantry-items", authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['manager', 'pantry']), pantryTasks_1.default);
app.use("/meal-preparation", authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['manager', 'pantry']), mealPreparation_1.default);
app.use("/meal-delivery", authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['delivery', 'manager']), mealDelivery_1.default);
app.use('/food-chart', authMiddleware_1.verifyToken, (0, authMiddleware_1.verifyRole)(['manager', 'pantry', 'delivery']), foodChart_1.default);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//# sourceMappingURL=server.js.map