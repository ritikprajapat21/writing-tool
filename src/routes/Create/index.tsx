import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Radio } from "antd";
import styles from "./style.module.css";

const Create = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location?.state?.isModalOpen || location?.key === "default") {
      setIsModalOpen(true);
    }
  }, [location]);

  const onCancel = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const onChange = (e: any) => {
    navigate(`/create/${e?.target.value}`);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Create"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={onCancel}
        footer={
          <div>
            <Button type="primary" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        }
      >
        <Radio.Group onChange={onChange} className={styles.links}>
          <Radio value="text" onClick={onChange}>
            Text
          </Radio>
          <Radio value="image" onClick={onChange}>
            Image
          </Radio>
        </Radio.Group>
      </Modal>
      <Outlet />
    </>
  );
};

export default Create;
