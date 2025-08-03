import { Link } from "react-router-dom";

export function Footer() {
  const isAuth = false;

  const navItemsAuth = [
    { label: "Recipes", path: "/" },
    { label: "Favorites", path: "/favorites" },
    { label: "Add Recipe", path: "/add" },
  ];

  const navItemsGuest = [
    { label: "Recipes", path: "/" },
    { label: "Contact AS", path: "/contact-as" },
    { label: "About Us", path: "/about" },
  ];

  const navItems = isAuth ? navItemsAuth : navItemsGuest;

  return (
    <footer className="bg-white dark:bg-[#1e1e2f] shadow-inner mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center text-gray-600 dark:text-[#e4e4e7]">
        <div className="mb-4 md:mb-0 text-sm">
          © 2025 RecipeHub. All rights reserved.
        </div>
        <nav className="flex gap-6 text-sm">
          {navItems.map(({ label, path }) => (
            <Link
              key={path}
              to={path}
              className="hover:text-green-600 dark:hover:text-green-400 transition"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
