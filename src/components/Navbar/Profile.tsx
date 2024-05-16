import { Tooltip } from "antd";
import styles from "./style.module.css";
import { useAuth } from "../../hooks/useAuth";

const Profile = () => {
  const { profile } = useAuth();
  return (
    <Tooltip
      placement="bottomLeft"
      color="#108ee9"
      trigger="hover"
      arrow={true}
      title={profile?.email}
    >
      <img
        className={styles.image}
        src={profile?.picture as string}
        alt="User profile image"
      />
    </Tooltip>
  );
};

export default Profile;
