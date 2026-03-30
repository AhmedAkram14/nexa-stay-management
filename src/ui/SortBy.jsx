import React from "react";

import { useSearchParams } from "react-router";

import Select from "./Select";

const SortBy = ({ options }) => {
  const [searchParams, setSeachParams] = useSearchParams();
  function handleChange(e) {
    searchParams.set("sortBy", e.target.value);
    setSeachParams(searchParams);
  }
  return <Select options={options} onChange={handleChange} />;
};

export default SortBy;
