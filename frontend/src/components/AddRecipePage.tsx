import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const recipeSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  imageUrl: z.string().url("Must be a valid URL"),
  ingredients: z.string().min(10, "Ingredients must be at least 10 characters"),
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
    reset,
  } = useForm<RecipeFormData>({
    resolver: zodResolver(recipeSchema),
  });

  const mutation = useMutation({
    mutationFn: async (data: RecipeFormData) => {
      const response = await axios.post("/api/recipes", data);
      return response.data;
    },
  });

  const onSubmit = (data: RecipeFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        alert("Recipe added successfully!");
        reset();
      },
      onError: () => {
        alert("Error adding recipe");
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-md shadow-md transition-colors">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-100">
        Add New Recipe
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

        <div>
          <label
            className="block mb-1 font-medium text-gray-700 dark:text-gray-300"
            htmlFor="ingredients"
          >
            Ingredients
          </label>
          <textarea
            id="ingredients"
            {...register("ingredients")}
            rows={4}
            className="w-full border border-gray-300 dark:border-gray-700 rounded px-3 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500 transition resize-none"
          />
          {errors.ingredients && (
            <p className="text-red-600 mt-1">{errors.ingredients.message}</p>
          )}
        </div>

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
