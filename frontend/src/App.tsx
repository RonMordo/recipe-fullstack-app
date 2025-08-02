import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { Header } from "./components/Header";
import { RecipesPage } from "./components/RecipesPage";
import { Footer } from "./components/Footer";
import { RecipeDetailPage } from "./components/RecipeDetailPage";
import { AddRecipePage } from "./components/AddRecipePage";
import { FavoritesPage } from "./components/FavoritesPage";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="max-w-7xl mx-auto px-6 py-10 min-h-[70vh]">
        <Routes>
          <Route path="/" element={<RecipesPage />} />
          <Route path="/recipe/:id" element={<RecipeDetailPage />} />
          <Route path="/add" element={<AddRecipePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
