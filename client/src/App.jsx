import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  CreateRecipePage,
  Login,
  HomePage,
  SavedRecipesPage,
  Register,
} from "./pages";
import { ProtectedRoutes } from "./ProtectedRoutes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="/create-recipe" element={<CreateRecipePage />} />
        <Route path="/saved-recipes" element={<SavedRecipesPage />} />
      </Route>
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/login" element={<Login />} />
    </Routes>
  );
}

export default App;
