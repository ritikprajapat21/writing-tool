import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface User {
  [key: string]: string | number;
}

interface Auth {
  login: () => void;
  logout: () => void;
  profile: User | null;
}

export const authContext = createContext<Auth>({} as Auth);

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<User | null>(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login failed:", error),
  });

  const logout = () => {
    googleLogout();
    toast.success("Log out successfull!");
    setProfile(null);
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          },
        )
        .then((res) => {
          toast.success("Log in successfull!");
          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <authContext.Provider value={{ login, profile, logout }}>
        <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
        {children}
      </authContext.Provider>
    </>
  );
};

export default AuthProvider;
