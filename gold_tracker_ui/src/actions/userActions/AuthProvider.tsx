import * as React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AlertMessage } from "../../components/common/alerts/AlertMessage";

interface AuthContextType {
  username: string;
  logged_in: boolean;
  signin: any;
  signout: (callback: VoidFunction) => void;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [username, setUser] = React.useState<any>(null);
  let [logged_in, set_logged_in] = React.useState<any>(null);
  let navigate = useNavigate();

  let signin = async (data: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/token/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (res.status === 400 || res.status === 401) {
        throw new Error("username or password do not match our records");
      }
      const json = await res.json();
      localStorage.setItem("token", json.auth_token);
      let token = localStorage.getItem("token");

      const userRes = await fetch("http://localhost:8000/api/v1/users/me", {
        method: "GET",
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      });
      const userJson = await userRes.json();
      console.log(userJson);
      setUser(userJson.username);
      set_logged_in(true);
      navigate("../partys");
    } catch (error) {
      console.log(error);
    }
  };

  let signout = (callback: VoidFunction) => {
    localStorage.removeItem("token");
    setUser("");
    set_logged_in(false);
  };

  let value = { username, signin, logged_in, signout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

//Lets other components manage AuthContext props
let AuthContext = React.createContext<AuthContextType>(null!);
export function useAuth() {
  return React.useContext(AuthContext);
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth();

  if (!auth.username) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" replace />;
  }

  return children;
}
