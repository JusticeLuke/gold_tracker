import * as React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser, login, getUser } from "./CRUDUser";

interface AuthContextType {
  username: string;
  token: string;
  signin: any;
  register: any;
  signout: (callback: VoidFunction) => void;
}

const websiteUrl = window.location.href;
const endpoint = websiteUrl.includes("witty-cliff")
  ? "https://goldtracker.azurewebsites.net"
  : "http://localhost:8000";
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [username, setUser] = React.useState<any>(null);
  let [token, setAuthToken] = React.useState<any>(null);
  let navigate = useNavigate();

  let signin = async (data: any) => {
    const userJson = await login(data);
    setUser(userJson.username);
    let token = localStorage.getItem("token");
    setAuthToken(token);
    getUser(token);
    navigate("../partys");
  };

  let signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser("");
    setAuthToken(null);
  };

  let register = async (data: any) => {
    let success = await createUser(data);
    if (success) {
      navigate("../login");
    }
  };

  let value = { username, signin, token, signout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Lets other components manage AuthContext props
let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  console.log(auth.token);
  if (!auth.token && !localStorage.getItem("token")) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return children;
}
