import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Layout } from "antd";
import CustomFooter from "./components/Footer";
import { useAuth } from "./hooks/useAuth";

function App() {
	const { profile } = useAuth();
	const navigate = useNavigate();

	// useEffect(() => {
	// 	if (!profile) {
	// 		navigate("/signin");
	// 	}
	// }, [profile, navigate]);

	return (
		<>
			<Layout style={{ height: "100vh", width: "100vw" }}>
				<Navbar />
				<Outlet />
				<CustomFooter />
			</Layout>
		</>
	);
}

export default App;
