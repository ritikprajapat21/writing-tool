import CustomFooter from "./components/Footer";
import { Layout } from "antd";
import Navbar from "./components/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { useEffect } from "react";

function App() {
  const { profile } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) {
      navigate("/signin");
    }
  }, [profile, navigate]);

  return (
    <>
      <Layout style={{ minHeight: "100vh", maxWidth: "100vw" }}>
        <Navbar />
        <Outlet />
        <CustomFooter />
      </Layout>
    </>
  );
}

export default App;
