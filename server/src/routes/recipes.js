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

router.get("/:recipeID", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.recipeID);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/", async (req, res) => {
  const recipe = new RecipeModel(req.body);
  const userId = recipe.recipeOwner;
  const owner = await UserModel.findById(userId);
  try {
    const response = await recipe.save();
    owner.createdRecipes.push(recipe);
    await owner.save();
    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" }, error);
  }
});

router.put("/", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.body.recipeID);
    const user = await UserModel.findById(req.body.userID);
    user.savedRecipes.push(recipe);
    await user.save();
    res.json({ savedRecipes: user.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
router.put("/delete", async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userID);
    const savedRecipes = user.savedRecipes;
    const index = savedRecipes.indexOf(req.body.recipeID);
    if (index !== -1) {
      savedRecipes.splice(index, 1);
    }
    await user.save();
    res.json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/savedRecipes/ids/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    res.status(200).json({ savedRecipes: user?.savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/savedRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const savedRecipes = await RecipeModel.find({
      _id: { $in: user.savedRecipes },
    });
    res.status(200).json({ savedRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/myRecipes/:userID", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userID);
    const createdRecipes = await RecipeModel.find({
      _id: { $in: user.createdRecipes },
    });
    res.status(200).json({ createdRecipes });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export { router as recipesRouter };
