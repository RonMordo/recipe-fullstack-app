import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { AuthDialog } from "./LoginRegisterDialog";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Убрали "Home", Recipes ведет на /recipes
  const navItems = [
    { label: "Recipes", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Add Recipe", path: "/add" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Логотип */}
        <Link
          to="/"
          className="text-2xl font-bold text-green-600 hover:text-green-700 transition"
        >
          RecipeHub
        </Link>

        {/* Навигация для десктопа */}
        <nav className="hidden md:flex gap-6">
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              className={({ isActive }) =>
                `text-sm font-medium transition ${
                  isActive
                    ? "text-green-600 underline"
                    : "text-gray-600 hover:text-green-500"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Кнопки авторизации */}
        <div className="hidden md:flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <AuthDialog />
          </div>
        </div>

        {/* Мобильное меню кнопка */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Мобильное меню контент */}
      {mobileOpen && (
        <nav
          id="mobile-menu"
          className="md:hidden px-4 pb-4 space-y-2 bg-white border-t border-gray-200"
        >
          {navItems.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block text-sm font-medium ${
                  isActive
                    ? "text-green-600 underline"
                    : "text-gray-700 hover:text-green-500"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <div className="pt-2 border-t mt-2">
            <Button variant="outline" size="sm" className="w-full">
              Login
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
