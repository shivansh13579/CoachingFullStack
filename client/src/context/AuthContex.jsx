import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    try {
      const user = localStorage.getItem("user") || null;
      const token = localStorage.getItem("token") || null;
      const isAuth = false;
      return { user, token, isAuth };
    } catch (error) {
      console.log("some issues", error);
      return {
        user: null,
        token: null,
      };
    }
  });

  const login = (user, token) => {
    try {
      setAuthData({ user, token });
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  const logout = () => {
    try {
      setAuthData({
        user: null,
        token: null,
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } catch (error) {
      console.log("Error deleting user:", error);
      return {
        user: null,
        token: null,
      };
    }
  };
  return (
    <AuthContext.Provider value={{ ...authData, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
