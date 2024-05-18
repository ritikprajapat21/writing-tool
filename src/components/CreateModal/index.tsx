import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Card, Modal, Radio, type RadioChangeEvent } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	const onClick = () => {
		console.log("click");
		setIsModalOpen(true);
		navigate("/create");
	};

	const onCancel = () => {
		setIsModalOpen(false);
		navigate(-1);
	};

	const onChange = (e: RadioChangeEvent) => {
		navigate(`/create/${e.target.value}`);
		setIsModalOpen(false);
	};
	return (
		<>
			<Button type="link" onClick={onClick}>
				<Card style={{ height: 75, width: 75 }}>
					<PlusSquareOutlined style={{ fontSize: 25 }} />
				</Card>
			</Button>
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
				<Radio.Group onChange={onChange}>
					<Radio value="text">Text</Radio>
					<Radio value="image">Image</Radio>
				</Radio.Group>
			</Modal>
		</>
	);
};

export default CreateModal;
