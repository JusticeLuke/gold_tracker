import * as React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { createUser, login } from "./CRUDUser";
import { getPartys } from "../partyActions/CRUDParty";

interface AuthContextType {
  username: string;
  token: string;
  signin: any;
  register: any;
  userPartys: any;
  signout: (callback: VoidFunction) => void;
}

//AuthProvider manages login/register/signout actions and their associated states
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [username, setUser] = React.useState<any>(null);
  let [token, setAuthToken] = React.useState<any>(null);
  let [userPartys, setUserPartys] = React.useState<any>(null);
  let navigate = useNavigate();

  //If user data is not saved in localStorage, login the user,
  //set the relavent states, and navigate to the partys page
  let signin = async (data: any, rememberMe: boolean) => {
    if (!rememberMe) {
      await login(data);
    }
    setAuthToken(localStorage.getItem("token"));
    const userPartyJson = await getPartys();
    setUserPartys(userPartyJson.results);
    navigate("../partys");
  };
  //Signout clears local storage and state
  let signout = () => {
    localStorage.clear();
    setUser(null);
    setUserPartys(null);
    setAuthToken(null);
    navigate("../login");
  };
  //Creates new user and navigates to the login page
  let register = async (data: any) => {
    let success = await createUser(data);
    //If user exists navigate to the login page
    if (success) {
      navigate("../login");
    }
  };

  let value = { username, userPartys, signin, token, signout, register };
  //AuthContext.Provider gets wrapped around all components
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Lets other components manage state of AuthProvider values
let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  return React.useContext(AuthContext);
}

//Redirects user to login page if program cannot find an auth token in local storage or state
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
