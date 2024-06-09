import { Modal } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useState } from "react";
import { useList } from "../../hooks/useList";
import useNotification from "antd/es/notification/useNotification";

const TextModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [value, setValue] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { appendItem } = useList();

  const [api, contextHolder] = useNotification();

  useEffect(() => {
    console.log(location);
    setIsModalOpen(true);
  }, []);

  const onCancel = () => {
    setIsModalOpen(false);
    navigate("/create");
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Create"
        open={isModalOpen}
        onOk={() => {
          if (value.length === 0) {
            return api["error"]({
              message: "No content",
              description: "Content is required",
            });
          }
          appendItem(value, true);
          setIsModalOpen(false);
          navigate("/");
        }}
        onCancel={onCancel}
      >
        <TextArea
          value={value}
          showCount
          autoFocus
          maxLength={250}
          autoSize={{ minRows: 4, maxRows: 8 }}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Enter your text"
          style={{ marginBottom: 12 }}
        />
      </Modal>
      <Outlet />
    </>
  );
};

export default TextModal;
