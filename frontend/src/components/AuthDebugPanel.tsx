import { useAuth } from "@/context/AuthContext";

export function AuthDebugPanel() {
  const { isAuth, login, logout } = useAuth();

  return (
    <div className="fixed top-4 right-4 bg-black/70 text-white p-3 rounded-lg z-50 shadow-lg">
      <p className="text-sm mb-2">
        Auth: <span className="font-bold">{isAuth ? "true" : "false"}</span>
      </p>
      <button
        onClick={isAuth ? logout : login}
        className="text-xs px-3 py-1 rounded bg-white text-black hover:bg-gray-200"
      >
        {isAuth ? "Logout" : "Login"}
      </button>
    </div>
  );
}
