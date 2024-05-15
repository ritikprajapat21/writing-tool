import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const SignIn: React.FC = () => {
	const navigate = useNavigate();

	const { profile, login } = useAuth();

	useEffect(() => {
		if (profile) {
			navigate("/");
		}
	}, [profile, navigate]);

	return (
		<div>
			<h1>Login</h1>
			{!profile && (
				<button type="button" onClick={() => login()}>
					Login with Google
				</button>
			)}
		</div>
	);
};

export default SignIn;
