import { Content } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { useList } from "../../hooks/useList";
import { Button, Card, List } from "antd";
import styles from "./styles.module.css";
import { PlusSquareOutlined } from "@ant-design/icons";

const CustomList = () => {
	const { list } = useList();
	return (
		<Content className={styles.container}>
			<Outlet />
			{list.length > 0 ? (
				<List
					grid={{
						gutter: 16,
						xs: 1,
						sm: 2,
						md: 4,
						lg: 4,
						xl: 6,
						xxl: 3,
					}}
					itemLayout="horizontal"
					className={styles.list}
					dataSource={list}
					renderItem={(item) => (
						<List.Item>
							<Card
								actions={[
									<Link key="edit" to={`/edit/${item.id}`}>
										<Button type="primary">Edit</Button>
									</Link>,
									<Link key="delete" to={`/delete/${item.id}`}>
										<Button type="primary">Delete</Button>
									</Link>,
								]}
								hoverable
							>
								{item?.text ? (
									<p>{item?.text}</p>
								) : (
									<img src={item?.image} alt="uploaded by user" />
								)}
							</Card>
						</List.Item>
					)}
				/>
			) : (
				<p>No content available. Create an item</p>
			)}
			<Link
				to="/create"
				className={styles.list}
				state={{ isModalOpen: true }}
				style={{ display: "inline-block" }}
			>
				<Card style={{ height: 75, width: 75 }}>
					<PlusSquareOutlined style={{ fontSize: 25 }} />
				</Card>
			</Link>
		</Content>
	);
};

export default CustomList;
