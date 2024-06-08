import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@recipe.ehsagpg.mongodb.net/?retryWrites=true&w=majority&appName=recipe`
);

const port = 3001;
app.listen(port, () => console.log(`Server running on ${port}`));
