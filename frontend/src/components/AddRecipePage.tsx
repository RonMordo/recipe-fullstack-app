import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters "),
  //
  ingredients: z
    .array(z.string().min(1, "Ingredient cannot be empty"))
    .min(1, "At least one ingredient is required"),
  preparationTime: z.string().nonempty("Preparation time is required"),
  tags: z.array(z.string()).nonempty("Must select a filter tag"),
  instructions: z
    .string()
    .min(10, "Instructions must be at least 10 characters"),
});

type RecipeFormData = z.infer<typeof recipeSchema>;

export function AddRecipePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });

  const [currentIngredient, setCurrentIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState<string[]>([]);

  const [currentTag, setCurrentTag] = useState("");
  const [tagsList, setTagsList] = useState<string[]>([]);

  useEffect(() => {
    setValue("ingredients", ingredientsList);
  }, [ingredientsList]);

  useEffect(() => {
    setValue("tags", tagsList);
  }, [tagsList]);

  const mutation = useMutation({
    mutationFn: async (data: RecipeFormData) => {
      const response = await axios.post("/api/recipes", data);
      return response.data;
    },
  });

  // const onSubmit = (data: RecipeFormData) => {
  //   const enrichedData: RecipeFormData = {
  //     ...data,
  //     ingredients: ingredientsList,
  //     tags: tagsList,
  //   };

  //   mutation.mutate(enrichedData, {
  //     onSuccess: () => {
  //       alert("Recipe added successfully!");
  //       reset();
  //       setIngredientsList([]);
  //       setTagsList([]);
  //     },
  //     onError: () => {
  //       alert("Error adding recipe");
  //     },
  //   });
  // };

  const onSubmit = (data: RecipeFormData) => {
    if (ingredientsList.length === 0) {
      alert("Please add at least one ingredient.");
      return;
    }

    const enrichedData: RecipeFormData = {
      ...data,
      ingredients: ingredientsList,
      tags: tagsList, // if you're using a similar list for tags
    };

    mutation.mutate(enrichedData, {
      onSuccess: () => {
        alert("Recipe added successfully!");
        reset();
        setIngredientsList([]);
        setTagsList([]);
      },
      onError: () => {
        alert("Error adding recipe");
      },
    });
  };

  // const onSubmit = (data: RecipeFormData) => {
  //   mutation.mutate(data, {
  //     onSuccess: () => {
  //       alert("Recipe added successfully!");
  //       reset();
  //     },
  //     onError: () => {
  //       alert("Error adding recipe");
  //     },
  //   });
  // };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow-md transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Add New Recipe
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* title section */}

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="title"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.title && (
            <p className="text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* image url */}

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="imageUrl"
          >
            Image URL
          </label>
          <input
            id="imageUrl"
            type="text"
            {...register("imageUrl")}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          />
          {errors.imageUrl && (
            <p className="text-red-600 mt-1">{errors.imageUrl.message}</p>
          )}
        </div>

        {/* Description section */}

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            rows={3}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          />
          {errors.description && (
            <p className="text-red-600 mt-1">{errors.description.message}</p>
          )}
        </div>

        {/* ingredients section */}

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="ingredientsInput"
          >
            Ingredients
          </label>

          <div className="flex space-x-2 mb-2">
            <input
              id="ingredientsInput"
              type="text"
              value={currentIngredient}
              onChange={(e) => setCurrentIngredient(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (currentIngredient.trim() !== "") {
                    setIngredientsList((prev) => [
                      ...prev,
                      currentIngredient.trim(),
                    ]);
                    setCurrentIngredient("");
                  }
                }
              }}
              className="flex-grow border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Type an ingredient and press Enter or Add"
            />
            <button
              type="button"
              onClick={() => {
                if (currentIngredient.trim() !== "") {
                  setIngredientsList((prev) => [
                    ...prev,
                    currentIngredient.trim(),
                  ]);
                  setCurrentIngredient("");
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>

          {/* ✅ Render horizontally with wrap */}
          {ingredientsList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {ingredientsList.map((ing, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                >
                  {ing}
                </span>
              ))}
            </div>
          )}

          {/* ✅ Hidden input for react-hook-form */}
          {/* <input
            type="hidden"
            {...register("ingredients")}
            value={JSON.stringify(ingredientsList)}
          /> */}

          {errors.ingredients && (
            <p className="text-red-600 mt-1">{errors.ingredients.message}</p>
          )}
        </div>

        {/* Tags Input Section */}
        <div className="mt-4">
          <label
            htmlFor="tagInput"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Tags
          </label>

          <div className="flex space-x-2 mb-2">
            <select
              id="tagInput"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              className="flex-grow border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition h-11"
            >
              <option value="">Select a tag</option>
              <option value="Kosher">Kosher</option>
              <option value="Vegan">Vegan</option>
              <option value="Vegeterian">Vegeterian</option>
              <option value="Meat-Based">Meat-Based</option>
              <option value="Gluten Free">Gluten Free</option>
              <option value="Other">Other</option>
            </select>
            <button
              type="button"
              onClick={() => {
                if (currentTag && !tagsList.includes(currentTag)) {
                  setTagsList((prev) => [...prev, currentTag]);
                  setCurrentTag("");
                }
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Add
            </button>
          </div>

          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {tagsList.map((tag, index) => (
                <span
                  key={index}
                  className="flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100 text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() =>
                      setTagsList((prev) => prev.filter((t) => t !== tag))
                    }
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* preparationTime section */}

        <div>
          <label
            htmlFor="preparationTime"
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
          >
            Preparation Time
          </label>
          <select
            id="preparationTime"
            {...register("preparationTime", {
              required: "Preparation time is required",
            })}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
          >
            <option value="">Select time</option>
            <option value="Under 15 minutes">Under 15 minutes</option>
            <option value="15-30 minutes">15-30 minutes</option>
            <option value="30-60 minutes">30-60 minutes</option>
            <option value="Over 1 hour">Over 1 hour</option>
          </select>
          {errors.preparationTime && (
            <p className="text-red-600 mt-1">
              {errors.preparationTime.message}
            </p>
          )}
        </div>

        {/* instructions section */}

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="instructions"
          >
            Instructions
          </label>
          <textarea
            id="instructions"
            {...register("instructions")}
            rows={6}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          />
          {errors.instructions && (
            <p className="text-red-600 mt-1">{errors.instructions.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={mutation.isPending}
          className={`w-full py-3 text-white font-semibold rounded transition ${
            mutation.isPending
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
          }`}
        >
          {mutation.isPending ? "Saving..." : "Add Recipe"}
        </button>
      </form>
    </div>
  );
}
