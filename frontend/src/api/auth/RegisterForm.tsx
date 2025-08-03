import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: any) => {
    console.log("Register Data", data);
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
            <label className="text-sm font-medium">Name</label>
            <Input {...register("name")} />
            {errors.name && (
              <p className="text-red-500 text-xs">{errors.name.message}</p>
            )}
          </div>

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

          <Button type="submit">Register</Button>
        </form>

        <div className="hidden md:block relative bg-muted aspect-[9/16]">
          <img
            src="https://the-steppe.com/wp-content/img-cache/1097/768/webp/2021/10/8c3e8f4de7b26675364165bbc9d76806.jpg.webp"
            alt="Illustration"
            className="absolute inset-0 h-full w-full object-cover rounded-r-lg"
          />
        </div>
      </CardContent>
    </Card>
  );
}
