import Dragger from "antd/es/upload/Dragger";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import { Modal, UploadProps } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useList } from "../../hooks/useList";

const ImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // when adding to the list of all cards
  const [fileURL, setFileURL] = useState("");
  const navigate = useNavigate();
  const { appendItem } = useList();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const onCancel = () => {
    setIsModalOpen(false);
    navigate("/create");
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload(file, _FileList) {
      const reader = new FileReader();

      reader.onload = () => {
        const url = reader.result as string;
        appendItem(url, false);
      };
      reader.readAsDataURL(file);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        navigate("/");
      }
      if (status === "done") {
        console.log("Done");
      } else if (status === "error") {
        console.log("Erro");
      }
      setIsModalOpen(false);
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <>
      <Modal
        title="Create"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={onCancel}
      >
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </Dragger>{" "}
      </Modal>
      <Outlet />
    </>
  );
};

export default ImageModal;
