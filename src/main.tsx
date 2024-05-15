import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./routes/Signin/index.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/auth/index.tsx";

const router = createBrowserRouter([
	{ path: "/", element: <App /> },
	{ path: "/signin", element: <SignIn /> },
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
		<AuthProvider>
			<React.StrictMode>
				<RouterProvider router={router} />
			</React.StrictMode>
		</AuthProvider>
	</GoogleOAuthProvider>,
);
