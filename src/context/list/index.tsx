import { createContext, useState } from "react";

interface Item {
  id: number;
  image?: string;
  text?: string;
}

interface ItemContextType {
  appendItem: (data: string, isText: boolean) => void;
  items: Item[];
  updateItem: (item: Item, index: number) => void;
}

export const listContext = createContext<ItemContextType>(
  {} as ItemContextType,
);

const ItemProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<Item[]>([{ id: 0, text: "Hi" }] as Item[]);

  const appendItem = (data: string, isText: boolean) => {
    const obj = {} as Item;
    obj.id = items.length;
    if (isText) {
      obj.text = data;
    } else {
      obj.image = data;
    }

    const newItems = [...items, obj];
    setItems(newItems);
  };

  const updateItem = (item: Item, index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1, item);
    setItems(newItems);
  };

  return (
    <listContext.Provider value={{ appendItem, items, updateItem }}>
      {children}
    </listContext.Provider>
  );
};

export default ItemProvider;
