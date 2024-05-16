import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import styles from "./styles.module.css";
import { useAuth } from "../../hooks/useAuth";

const SignIn: React.FC = () => {
  const navigate = useNavigate();

  const { profile, login } = useAuth();

  useEffect(() => {
    if (profile) {
      navigate("/");
    }
  }, [profile, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Login</h1>
        {!profile && (
          <Button type="primary" onClick={() => login()}>
            Login with Google
          </Button>
        )}
      </div>
    </div>
  );
};

export default SignIn;
