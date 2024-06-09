import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  CreateRecipePage,
  Register,
  Login,
  HomePage,
  SavedRecipesPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-recipe" element={<CreateRecipePage />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/saved-recipes" element={<SavedRecipesPage />} />
    </Routes>
  );
}

export default App;
