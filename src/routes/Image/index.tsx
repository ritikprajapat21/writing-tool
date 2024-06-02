import Dragger from "antd/es/upload/Dragger";
import InboxOutlined from "@ant-design/icons/lib/icons/InboxOutlined";
import { Modal, UploadProps } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ImageModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // when adding to the list of all cards
  const [fileURL, setFileURL] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const onCancel = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload(file, FileList) {
      console.log(file, FileList);
      const reader = new FileReader();

      reader.onload = () => {
        const url = reader.result as string;
        setFileURL(url);
      };
      reader.readAsDataURL(file);
      return false;
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log("Upl");
        console.log(info.file, info.fileList);
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
