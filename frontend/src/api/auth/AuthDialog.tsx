import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

export function AuthDialog() {
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");
  const [searchParams, setSearchParams] = useSearchParams();

  // Чтение таба из URL
  useEffect(() => {
    const currentTab = searchParams.get("tab");
    if (currentTab === "register" || currentTab === "login") {
      setTab(currentTab);
    }
  }, [searchParams]);

  // Смена таба + запись в URL
  const handleTabChange = (value: string) => {
    if (value === "login" || value === "register") {
      setTab(value);
      setSearchParams({ tab: value });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Authorization</Button>
      </DialogTrigger>

      <DialogContent className="max-w-3xl w-full p-0">
        <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="mx-auto mt-4 w-[300px] grid grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <LoginForm
              onSuccess={() => setOpen(false)}
              onSwitchToRegister={() => handleTabChange("register")}
            />
          </TabsContent>

          <TabsContent value="register">
            <RegisterForm onSuccess={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
