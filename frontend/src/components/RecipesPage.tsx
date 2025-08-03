// RecipesPage.tsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FilterSidebar } from "./FilterSidebar";
import { Menu } from "lucide-react";

type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
  prepTime: string;
  foodType: string;
};

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    imageUrl:
      "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-jumbo-v2.jpg",
    prepTime: "30–60 minutes",
    foodType: "Meat-based",
  },
  {
    id: "2",
    title: "Chicken Salad",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    prepTime: "15–30 minutes",
    foodType: "Kosher",
  },
  {
    id: "3",
    title: "Beef Stroganoff",
    imageUrl:
      "https://supermancooks.com/wp-content/uploads/2023/03/traditional-beef-stroganoff-featured.jpg",
    prepTime: "Over 1 hour",
    foodType: "Meat-based",
  },
  {
    id: "4",
    title: "Vegetable Stir Fry",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
    prepTime: "15–30 minutes",
    foodType: "Vegan",
  },
  {
    id: "5",
    title: "Fish Tacos",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
    prepTime: "30–60 minutes",
    foodType: "Kosher",
  },
  {
    id: "6",
    title: "Pancakes",
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
    prepTime: "15–30 minutes",
    foodType: "Vegetarian",
  },
  {
    id: "7",
    title: "Caesar Salad",
    imageUrl:
      "https://www.maggi.co.uk/sites/default/files/srh_recipes/3ee1954a36009dd59be2d362a2a44cf6.jpg",
    prepTime: "Under 15 minutes",
    foodType: "Vegetarian",
  },
  {
    id: "8",
    title: "Tomato Soup",
    imageUrl:
      "https://www.onceuponachef.com/images/2021/02/Tomato-Soup-3-1200x1800.jpg",
    prepTime: "15–30 minutes",
    foodType: "Vegan",
  },

  {
    id: "9",
    title: "Quinoa Salad",
    imageUrl:
      "https://cdn.loveandlemons.com/wp-content/uploads/2020/08/quinoa-salad.jpg",
    prepTime: "15–30 minutes",
    foodType: "Vegan",
  },
  {
    id: "10",
    title: "Grilled Salmon",
    imageUrl:
      "https://www.thecookierookie.com/wp-content/uploads/2023/05/featured-grilled-salmon-recipe.jpg",
    prepTime: "30–60 minutes",
    foodType: "Kosher",
  },
  {
    id: "11",
    title: "Lentil Soup",
    imageUrl:
      "https://hips.hearstapps.com/hmg-prod/images/lentil-soup-recipe-2-677c54158ad10.jpg?crop=0.6667718689179948xw:1xh;center,top&resize=1200:*",
    prepTime: "30–60 minutes",
    foodType: "Vegan",
  },
  {
    id: "12",
    title: "Roasted Chicken",
    imageUrl:
      "https://assets.bonappetit.com/photos/62f5674caf9bae430097be0f/1:1/w_2560%2Cc_limit/0810-no-fail-roast-chicken-v2.jpg",
    prepTime: "Over 1 hour",
    foodType: "Meat-based",
  },
  {
    id: "13",
    title: "Avocado Toast",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc9AIvAc6dkD5GTVhVASi91F4Jc4n7AbOFhw&s",
    prepTime: "Under 15 minutes",
    foodType: "Vegetarian",
  },
  {
    id: "14",
    title: "Beetroot Salad",
    imageUrl:
      "https://cdn77-s3.lazycatkitchen.com/wp-content/uploads/2022/08/beetroot-salad-maple-walnut-platter-cloudy-800x1200.jpg",
    prepTime: "15–30 minutes",
    foodType: "Vegan",
  },
  {
    id: "15",
    title: "Shrimp Pasta",
    imageUrl:
      "https://www.eatloveeats.com/wp-content/uploads/2021/07/Lemon-Garlic-Shrimp-Pasta-22.jpg",
    prepTime: "30–60 minutes",
    foodType: "Kosher",
  },
  {
    id: "16",
    title: "Mushroom Risotto",
    imageUrl:
      "https://hips.hearstapps.com/del.h-cdn.co/assets/17/35/1600x1600/square-1504128527-delish-mushroom-risotto.jpg?resize=1200:*",
    prepTime: "Over 1 hour",
    foodType: "Vegetarian",
  },
];

type FilterState = {
  time: string[];
  type: string[];
};

export function RecipesPage() {
  const navigate = useNavigate();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    time: [],
    type: [],
  });

  const filtered = recipes.filter((recipe) => {
    const matchesTime =
      filters.time.length === 0 || filters.time.includes(recipe.prepTime);
    const matchesType =
      filters.type.length === 0 || filters.type.includes(recipe.foodType);
    return matchesTime && matchesType;
  });

  return (
    <div className="relative max-w-7xl mx-auto px-6 py-10">
      <button
        aria-label="Toggle filter sidebar"
        className="absolute left-0 top-4 text-green-600 hover:text-green-800 flex items-center gap-2 font-semibold text-lg px-3 py-2 rounded-md border border-green-600 hover:border-green-800 transition-shadow shadow-md"
        onClick={() => setIsFilterOpen(!isFilterOpen)}
      >
        <Menu className="w-6 h-6" />
        Filters
      </button>

      <FilterSidebar
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <h1 className="text-5xl font-extrabold text-center mb-12 text-green-700">
        Delicious Recipes
      </h1>

      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 dark:text-gray-300">
          No recipes found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filtered.map((recipe) => (
            <div
              key={recipe.id}
              className="relative cursor-pointer overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl"
              onClick={() => navigate(`/recipe/${recipe.id}`)}
            >
              <img
                src={recipe.imageUrl}
                alt={recipe.title}
                className="w-full h-48 object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <h2 className="text-white text-xl font-semibold">
                  {recipe.title}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
