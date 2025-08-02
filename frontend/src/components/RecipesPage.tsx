import { useNavigate } from "react-router-dom";

type Recipe = {
  id: string;
  title: string;
  imageUrl: string;
};

const recipes: Recipe[] = [
  {
    id: "1",
    title: "Spaghetti Carbonara",
    imageUrl:
      "https://static01.nyt.com/images/2021/02/14/dining/carbonara-horizontal/carbonara-horizontal-jumbo-v2.jpg",
  },
  {
    id: "2",
    title: "Chicken Salad",
    imageUrl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "3",
    title: "Beef Stroganoff",
    imageUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "4",
    title: "Vegetable Stir Fry",
    imageUrl:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "5",
    title: "Fish Tacos",
    imageUrl:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "6",
    title: "Pancakes",
    imageUrl:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "7",
    title: "Caesar Salad",
    imageUrl:
      "https://www.maggi.co.uk/sites/default/files/srh_recipes/3ee1954a36009dd59be2d362a2a44cf6.jpg",
  },
  {
    id: "8",
    title: "Tomato Soup",
    imageUrl:
      "https://www.onceuponachef.com/images/2021/02/Tomato-Soup-3-1200x1800.jpg",
  },
];

export function RecipesPage() {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-green-700">
        Delicious Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {recipes.map((recipe) => (
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
    </div>
  );
}
