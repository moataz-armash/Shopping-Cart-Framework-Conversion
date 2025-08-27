import { createContext, useContext, useState } from "react";

interface User {
  userName: string;
  email: string;
  password: string;
}

interface authContextType {
  user: User;
  register: () => void;
  login: () => void;
  logout: () => void;
  isAuthenticated?: boolean;
  setUser: (user: User) => void;
}

const authContext = createContext<authContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState({
    userName: "",
    password: "",
    email: "",
  });
  const isAuthenticated = !!localStorage.getItem("userName");
  const register = () => {
    if (user.userName === "" || user.email === "" || user.password === "") {
      alert("please Fill The Empty");
    } else {
      localStorage.setItem("userName", user.userName);
      localStorage.setItem("email", user.email);
      localStorage.setItem("password", user.password);

      setTimeout(() => {
        window.location.href = "/";
      }, 500);
    }
  };
  const login = () => {
    const getUserName = localStorage.getItem("userName");
    const getPassword = localStorage.getItem("password");
    if (user.userName === "" || user.password === "") {
      alert("Fill Your Data");
    } else {
      if (
        user.userName &&
        getUserName?.trim() === user.userName.trim() &&
        user.password &&
        getPassword?.trim() &&
        user.password.trim()
      ) {
        localStorage.setItem("userName", user.userName);
        localStorage.setItem("password", user.password);
        setTimeout(() => {
          window.location.href = "/";
        }, 500);
      } else {
        alert("not valid");
      }
    }
  };
  const logout = () => {
    setUser({ userName: "", password: "", email: "" });
    localStorage.removeItem("userName");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    setTimeout(() => {
      window.location.href = "/login";
    }, 500);
  };

  return (
    <authContext.Provider
      value={{ user, login, register, logout, isAuthenticated, setUser }}
    >
      {children}
    </authContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(authContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
