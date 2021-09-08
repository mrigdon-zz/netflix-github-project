import React from "react";
import { ColumnId } from "../components/OrgReposTable";

export interface HomeParams {
  search: string;
  ascending: boolean;
  column: ColumnId;
}

export const HomeContext = React.createContext<{
  params: HomeParams;
  setParams: (params: HomeParams) => void;
}>({
  params: { search: "", ascending: false, column: "stars" },
  setParams(_: HomeParams) {},
});
