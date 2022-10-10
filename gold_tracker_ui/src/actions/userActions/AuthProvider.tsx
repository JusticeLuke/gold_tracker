import * as React from "react";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>> 
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  partyId: string | null;
  setPartyId: React.Dispatch<React.SetStateAction<string | null>>;
  signout: (callback: VoidFunction) => void;
}

//AuthProvider manages login/register/signout actions and their associated states
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let localToken = localStorage.getItem('token');
  let localUsername = localStorage.getItem('username');
  let localUserId = localStorage.getItem('userId')
  let localPartyId = localStorage.getItem('partyId');

  let navigate = useNavigate();

  let [username, setUsername] = React.useState<string | null>(localUsername);
  let [userId, setUserId] = React.useState<string | null>(localUserId);
  let [partyId, setPartyId] = React.useState<string | null>(localPartyId);
  let [token, setToken] = React.useState<string | null>(localToken);  

  React.useEffect(() => {
    setToken(localStorage.getItem('token'));
  },[localToken]);

  React.useEffect(() => {
    setUsername(localStorage.getItem('username'));
  },[localUsername]);

  React.useEffect(() => {
    setPartyId(localStorage.getItem('partyId'));
  },[localPartyId]);

  React.useEffect(() => {
    setPartyId(localStorage.getItem('userId'));
  },[localUserId]);

  let signout = () => {
    localStorage.clear();
    setUserId(null);
    setUsername(null);
    setToken(null);
    setPartyId(null);
    navigate("../login");
  };

  let value = { username, userId, token, partyId, setUsername, setUserId, setToken, setPartyId, signout};
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
    return <Navigate to="/login" replace />;
  }

  return children;
}

