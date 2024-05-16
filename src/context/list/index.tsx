import { createContext, useState } from "react";

interface List {
  id: number;
  image?: string;
  text?: string;
}

interface ListContextType {
  setList: React.Dispatch<React.SetStateAction<List[]>>;
  list: List[];
}

export const listContext = createContext<ListContextType>(
  {} as ListContextType,
);

const ListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [list, setList] = useState<List[]>([{ id: 1, text: "Hi" }] as List[]);

  return (
    <listContext.Provider value={{ setList, list }}>
      {children}
    </listContext.Provider>
  );
};

export default ListProvider;
