import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import SignIn from "./routes/Signin/index.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthProvider from "./context/auth/index.tsx";
import List from "./routes/List/index.tsx";
import Create from "./routes/Create/index.tsx";
import Edit from "./routes/Edit/index.tsx";
import Delete from "./routes/Delete/index.tsx";
import ListProvider from "./context/list/index.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <List />,
        children: [
          { path: "/create", element: <Create /> },
          { path: "/edit/:id", element: <Edit /> },
          { path: "/delete/:id", element: <Delete /> },
        ],
      },
    ],
  },
  { path: "/signin", element: <SignIn /> },
]);

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENTID}>
    <AuthProvider>
      <ListProvider>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </ListProvider>
    </AuthProvider>
  </GoogleOAuthProvider>,
);
