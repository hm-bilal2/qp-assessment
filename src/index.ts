import express from 'express';
import dotenv from 'dotenv';
import adminRouter from "./routes/adminRoutes";
import commonRoutes from "./routes/commonRoutes"

dotenv.config();

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", commonRoutes);
app.use("/api", adminRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});