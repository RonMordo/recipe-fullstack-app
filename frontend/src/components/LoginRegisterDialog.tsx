import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";

// Schemas
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

// Types
type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

export function AuthDialog() {
  const [tab, setTab] = useState<"login" | "register">("login");

  // Login form
  const {
    register: loginRegister,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Register form
  const {
    register: registerRegister,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Handlers
  const onLoginSubmit = (data: LoginFormData) => {
    console.log("Logging in:", data);
  };

  const onRegisterSubmit = (data: RegisterFormData) => {
    console.log("Registering:", data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <DialogHeader>
          <DialogTitle className="text-center capitalize">
            {tab === "login" ? "Login" : "Register"}
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="login"
          value={tab}
          onValueChange={(val) => setTab(val as "login" | "register")}
        >
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <form
              onSubmit={handleLoginSubmit(onLoginSubmit)}
              className="space-y-4"
            >
              <div>
                <Label>Email</Label>
                <Input type="email" {...loginRegister("email")} />
                {loginErrors.email && (
                  <p className="text-red-500 text-sm">
                    {loginErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" {...loginRegister("password")} />
                {loginErrors.password && (
                  <p className="text-red-500 text-sm">
                    {loginErrors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="register">
            <form
              onSubmit={handleRegisterSubmit(onRegisterSubmit)}
              className="space-y-4"
            >
              <div>
                <Label>Name</Label>
                <Input {...registerRegister("name")} />
                {registerErrors.name && (
                  <p className="text-red-500 text-sm">
                    {registerErrors.name.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" {...registerRegister("email")} />
                {registerErrors.email && (
                  <p className="text-red-500 text-sm">
                    {registerErrors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" {...registerRegister("password")} />
                {registerErrors.password && (
                  <p className="text-red-500 text-sm">
                    {registerErrors.password.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Register
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
