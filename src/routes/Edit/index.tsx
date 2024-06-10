import { Modal, UploadProps } from "antd";
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useList } from "../../hooks/useList";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import TextArea from "antd/es/input/TextArea";

const Edit = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { items, updateItem } = useList();
  const { id } = useParams();

  const item = items.filter((item) => item?.id === parseInt(id as string))[0];
  const [value, setValue] = useState(item?.text || item?.image);

  useEffect(() => {
    setIsModalOpen(true);
  }, []);

  const onCancel = () => {
    setIsModalOpen(false);
    navigate("/");
  };

  const onOk = () => {
    const newItem = { ...item };
    newItem.text = value;
    updateItem(newItem, parseInt(id as string));
    setIsModalOpen(false);
    navigate("/");
  };

  const props: UploadProps = {
    name: "file",
    multiple: false,
    accept: "image/*",
    beforeUpload(file, _FileList) {
      const reader = new FileReader();

      reader.onload = () => {
        const url = reader.result as string;
        const newItem = { ...item };
        newItem.image = url;
        updateItem(newItem, parseInt(id || ""));
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

  if (item?.text) {
    return (
      <>
        <Modal
          title="Edit Text"
          open={isModalOpen}
          onOk={onOk}
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
  }

  return (
    <>
      <Modal
        title="Edit Image"
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
          navigate("/");
        }}
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

export default Edit;
