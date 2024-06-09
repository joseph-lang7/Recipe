import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await RecipeModel.find({});
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  try {
    const response = await recipe.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }, error);
  }
});

export { router as recipesRouter };
