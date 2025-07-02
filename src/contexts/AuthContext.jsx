import { useState, useEffect, createContext, useContext } from "react";

// Authentication Context
const AuthContext = createContext();

// Auth Provider Component
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuth = () => {
      // In Claude artifacts, we can't use localStorage, so we'll just set loading to false
      // In a real deployment, you would check localStorage here
      try {
        // This would be: const savedUser = localStorage.getItem("karaoke_user");
        // For now, we'll just simulate no saved user
        const savedUser = null;

        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error("Error checking auth:", error);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = (userData) => {
    setUser(userData);
    // In a real deployment, you would also do:
    // localStorage.setItem("karaoke_user", JSON.stringify(userData));
    console.log("User logged in:", userData);
  };

  const logout = () => {
    setUser(null);
    // In a real deployment, you would also do:
    // localStorage.removeItem("karaoke_user");
    console.log("User logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
