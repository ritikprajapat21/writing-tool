import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal, Radio, type RadioChangeEvent } from "antd";
import styles from "./style.module.css";

const Create = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const navigate = useNavigate();

	// useEffect(() => {
	// 	setIsModalOpen(true);
	// }, []);

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
					<Radio value="text">Text</Radio>
					<Radio value="image">Image</Radio>
				</Radio.Group>
			</Modal>
			<Outlet />
		</>
	);
};

export default Create;
