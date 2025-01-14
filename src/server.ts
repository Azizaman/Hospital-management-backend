import express from "express";
import pantry from './routes/pantry'
import pantryTasksRoutes from "./routes/pantryTasks";
import mealPreparationRoutes from "./routes/mealPreparation";
import mealDeliveryRoutes from "./routes/mealDelivery";
import { verifyToken, verifyRole } from "./middleware/authMiddleware"; 
import authRoutes from './routes/authRoutes';  // Corrected import
import patient from './routes/patient'
import foodcharts from './routes/foodChart';
import cors from 'cors'

const app = express();
app.use(express.json());

app.use(cors());

// Register and login routes
app.use('/auth', authRoutes);

app.use('/patient',verifyToken,verifyRole(['manager','pantry','delivery']),patient)
app.use("/pantry", verifyToken, verifyRole(['manager']), pantry);
app.use("/pantry-items", verifyToken, verifyRole(['manager', 'pantry']), pantryTasksRoutes);
app.use("/meal-preparation", verifyToken, verifyRole(['manager', 'pantry']), mealPreparationRoutes);
app.use("/meal-delivery", verifyToken, verifyRole(['delivery', 'manager']), mealDeliveryRoutes);
app.use('/food-chart',verifyToken,verifyRole(['manager','pantry','delivery']),foodcharts);

const PORT =  5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
