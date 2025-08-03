import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export function LoginForm({
  onSuccess,
  onSwitchToRegister,
}: {
  onSuccess: () => void;
  onSwitchToRegister: () => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Login Data", data);
    onSuccess();
  };

  return (
    <Card>
      <CardContent className="grid md:grid-cols-2 p-0 min-h-[500px]">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-center gap-4 p-6"
        >
          <div>
            <label className="text-sm font-medium">Email</label>
            <Input type="email" {...register("email")} />
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <Input type="password" {...register("password")} />
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit">Login</Button>

          <div className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToRegister}
              className="underline underline-offset-4 text-green-600 hover:text-green-700"
            >
              Register
            </button>
          </div>
        </form>

        <div className="hidden md:block relative bg-muted aspect-[9/16]">
          <img
            src="https://roll-club.dp.ua/wp-content/uploads/2024/02/pizza-recipe.jpg"
            alt="Illustration"
            className="absolute inset-0 h-full w-full object-cover rounded-r-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
