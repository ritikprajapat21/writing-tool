import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import TextArea from "antd/es/input/TextArea";

const TextModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [value, setValue] = useState("");
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		console.log(location);
		setIsModalOpen(true);
	}, []);

	const onCancel = () => {
		setIsModalOpen(false);
		navigate(-1);
	};

	return (
		<>
			<Modal
				title="Create"
				open={isModalOpen}
				onOk={() => setIsModalOpen(false)}
				onCancel={onCancel}
				// footer={
				// 	<>
				// 		<div>
				// 			<Button type="primary" onClick={() => setIsModalOpen(false)}>
				// 				Create
				// 			</Button>
				// 		</div>
				// 		<div>
				// 			<Button type="primary" onClick={onCancel}>
				// 				Cancel
				// 			</Button>
				// 		</div>
				// 	</>
				// }
			>
				<TextArea
					value={value}
					onChange={(e) => setValue(e.target.value)}
					placeholder="Enter your text"
					autoSize={{ minRows: 3, maxRows: 5 }}
				/>
			</Modal>
			<Outlet />
		</>
	);
};

export default TextModal;
