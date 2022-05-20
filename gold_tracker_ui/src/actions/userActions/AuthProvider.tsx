import * as React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser, login, getUser } from "./CRUDUser";
import { getPartys } from "../partyActions/CRUDParty";

interface AuthContextType {
  username: string;
  token: string;
  signin: any;
  register: any;
  userPartys: any;
  signout: (callback: VoidFunction) => void;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [username, setUser] = React.useState<any>(null);
  let [token, setAuthToken] = React.useState<any>(null);
  let [userPartys, setUserPartys] = React.useState<any>(null);
  let navigate = useNavigate();

  let signin = async (data: any, rememberMe: boolean) => {
    if (!rememberMe) {
      await login(data);
    }
    setAuthToken(localStorage.getItem("token"));
    const userPartyJson = await getPartys(localStorage.getItem("token"));
    setUserPartys(userPartyJson.results);
    navigate("../partys");
  };

  let signout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("partys");
    localStorage.removeItem("id");
    setUser(null);
    setUserPartys(null);
    setAuthToken(null);
  };

  let register = async (data: any) => {
    let success = await createUser(data);
    if (success) {
      navigate("../login");
    }
  };

  let value = { username, userPartys, signin, token, signout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Lets other components manage AuthContext props
let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  if (!auth.token && !localStorage.getItem("token")) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return children;
}
