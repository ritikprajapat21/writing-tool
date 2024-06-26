import { Content } from "antd/es/layout/layout";
import { Link, Outlet } from "react-router-dom";
import { useList } from "../../hooks/useList";
import { Button, Card, Image, List } from "antd";
import styles from "./styles.module.css";
import { PlusSquareOutlined } from "@ant-design/icons";

const CustomList = () => {
  const { items } = useList();
  return (
    <Content className={styles.container}>
      <Outlet />
      {items.length > 0 ? (
        <List
          className={styles.list}
          dataSource={items}
          renderItem={(item) => (
            <List.Item
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                maxWidth: 500,
              }}
              className={styles.card}
            >
              <Card hoverable style={{ minWidth: 160 }}>
                {item?.text ? (
                  <p>{item?.text}</p>
                ) : (
                  <Image.PreviewGroup items={[item?.image as string]}>
                    <Image
                      src={item?.image}
                      style={{ maxHeight: 250, maxWidth: 250 }}
                    />
                  </Image.PreviewGroup>
                )}
                <div className={styles.cardActions}>
                  <Link key="edit" to={`/edit/${item.id}`}>
                    <Button type="primary">Edit</Button>
                  </Link>
                  <Link key="delete" to={`/delete/${item.id}`}>
                    <Button type="primary">Delete</Button>
                  </Link>
                </div>
              </Card>
            </List.Item>
          )}
        />
      ) : (
        <p className={styles.noContent}>
          No items available. Create an <Link to="/create">item</Link>
        </p>
      )}
      <Link
        to="/create"
        state={{ isModalOpen: true }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Card style={{ height: 75, width: 75 }}>
          <PlusSquareOutlined style={{ fontSize: 25 }} />
        </Card>
      </Link>
    </Content>
  );
};

export default CustomList;
