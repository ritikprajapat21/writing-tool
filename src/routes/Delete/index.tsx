import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useList } from "../../hooks/useList";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { deleteItem } = useList();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const onOk = () => {
    deleteItem(parseInt(id || ""));
    setIsModalOpen(false);
    navigate("/");
  };

  const onCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <>
      <Modal
        title="Edit Text"
        open={isModalOpen}
        onOk={onOk}
        onCancel={onCancel}
      >
        Are you sure you want to delete this item?
      </Modal>
    </>
  );
};

export default Delete;
