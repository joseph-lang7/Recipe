import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  CreateRecipePage,
  AuthPage,
  HomePage,
  SavedRecipesPage,
} from "./pages";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create-recipe" element={<CreateRecipePage />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/saved-recipes" element={<SavedRecipesPage />} />
    </Routes>
  );
}

export default App;
