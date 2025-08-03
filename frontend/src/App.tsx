import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { RecipesPage } from "./components/RecipesPage";
import { Footer } from "./components/Footer";
import { RecipeDetailPage } from "./components/RecipeDetailPage";
import { AddRecipePage } from "./components/AddRecipePage";
import { FavoritesPage } from "./components/FavoritesPage";
import { AuthProvider } from "@/context/AuthContext";
import { ContactASPage } from "./components/ContactASPage";
import { AboutUsPage } from "./components/AboutUsPage";
import { ThemeProvider } from "./context/ThemeProvider";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Header />
          <main className="max-w-7xl mx-auto px-6 py-10 min-h-[70vh]">
            <Routes>
              <Route path="/" element={<RecipesPage />} />
              <Route path="/recipe/:id" element={<RecipeDetailPage />} />
              <Route path="/add" element={<AddRecipePage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/contact-as" element={<ContactASPage />} />
              <Route path="/about" element={<AboutUsPage />} />
            </Routes>
          </main>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
