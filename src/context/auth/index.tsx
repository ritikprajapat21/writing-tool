import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
	[key: string]: string | number;
}

interface Auth {
	login: () => void;
	logout: () => void;
	profile: User | null;
}

const authContext = createContext<Auth>({} as Auth);

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
		// biome-ignore lint/complexity/noBannedTypes: <explanation>
		setProfile(null as unknown as {});
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
					setProfile(res.data);
				})
				.catch((err) => console.log(err));
		}
	}, [user]);

	return (
		<authContext.Provider value={{ login, profile, logout }}>
			{children}
		</authContext.Provider>
	);
};

export const useAuth = () => useContext(authContext);

export default AuthProvider;
