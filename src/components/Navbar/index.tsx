import { Button } from "antd";
import { Link } from "react-router-dom";
import { Header } from "antd/es/layout/layout";
import styles from "./style.module.css";
import Profile from "./Profile";
import { useAuth } from "../../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <Header className={styles.header}>
      <Link to="/">
        <h2 className={styles.link}>Writing Tool</h2>
      </Link>
      <div className={styles.secondPart}>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
        <Profile />
      </div>
    </Header>
  );
};

export default Navbar;
