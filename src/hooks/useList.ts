import { useContext } from "react";
import { listContext } from "../context/list";

export const useList = () => useContext(listContext)