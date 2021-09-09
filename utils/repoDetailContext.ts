import React from "react";

export interface RepoDetailParams {
  org: string;
  repo: string;
  branch: string;
}

export const RepoDetailContext = React.createContext<{
  params: RepoDetailParams;
  // setParams: (params: RepoDetailParams) => void;
}>({
  params: { org: "", repo: "", branch: "" },
  // setParams(_: RepoDetailParams) {},
});
