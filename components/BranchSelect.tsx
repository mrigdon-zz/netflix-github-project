import React, { useEffect, useState } from "react";
import { fetchBranches } from "../githubAPI";
import Branch from "../githubAPI/Branch";

export default function BranchSelect(props: {
  org: string;
  repo: string;
  value: string;
  onSelect: (name: string) => void;
}) {
  const [branches, setBranches] = useState([{ name: props.value }] as Branch[]);

  useEffect(() => {
    async function fetchData() {
      const { data } = await fetchBranches(props.org, props.repo);
      if (data) setBranches(data);
    }
    fetchData();
  }, []);

  return (
    <select
      value={props.value}
      onChange={(e) => props.onSelect(e.target.value)}
    >
      {branches.map((branch) => (
        <option key={branch.name} value={branch.name}>
          {branch.name}
        </option>
      ))}
    </select>
  );
}
