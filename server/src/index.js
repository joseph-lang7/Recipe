import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";
import { recipesRouter } from "./routes/recipes.js";
dotenv.config();
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://recipe-jl.netlify.app",
  })
);
app.use(
  cors({
    origin: "url",
  })
);

app.use("/auth", userRouter);
app.use("/recipes", recipesRouter);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@recipe.ehsagpg.mongodb.net/recipe?retryWrites=true&w=majority&appName=recipe`
);

const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server running on ${port}`));
