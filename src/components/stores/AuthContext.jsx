// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

// Create the provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // optional: to handle loading state

  useEffect(() => {
    const fetchUser = async () => {
      try {

        const token = localStorage.getItem("token");
        
        const response = await axios.get("http://127.0.0.1:8000/api/user", {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });     

        setUser(response.data.user);

      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null); // or handle auth logout
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Create a custom hook for easy use
export const useAuth = () => useContext(AuthContext);
