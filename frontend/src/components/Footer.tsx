import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-gray-600">
        <div className="mb-4 md:mb-0 text-sm">
          © 2025 RecipeHub. All rights reserved.
        </div>
        <nav className="flex gap-6 text-sm">
          <Link to="/" className="hover:text-green-600 transition">
            Recipes
          </Link>
          <Link to="/favorites" className="hover:text-green-600 transition">
            Favorites
          </Link>
          <Link to="/add" className="hover:text-green-600 transition">
            Add Recipe
          </Link>
        </nav>
      </div>
    </footer>
  );
}
