import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";

const FilterDropdown = () => {
  const [state, updateState] = useState({
    categories: [],
    loading: true
  });

  var options = [];

  const fetchCategories = () => {
    axios
      .get("/api/v1/categories", {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')
            .content
        }
      })
      .then(response => {
        updateState({
          categories: response.data.data,
          loading: false
        });
        getOptions();
      });
  };

  const getOptions = () => {
    state.categories.map(category => {
      options.push({ value: category.id, label: category.name });
    });
  };

  useEffect(fetchCategories, []);
  useEffect(getOptions);

  return (
    <Select
      styles={dropdownStyles}
      options={options}
      className="col-md-4 filter"
      placeholder="Filter"
    />
  );
};

export default FilterDropdown;

const dropdownStyles = {
  option: provided => ({
    ...provided,
    padding: 10,
    fontSize: 15
  }),
  control: provided => ({
    ...provided,
    height: "100%",
    fontSize: 17,
    backgroundColor: "hsla(0, 0%, 100%, 0.75)",
    borderRadius: "18px",
    height: "50px",
    border: "none"
  }),
  dropdownIndicator: provided => ({
    ...provided,
    color: "hsl(0,0%,50%)"
  }),
  indicatorSeparator: provided => ({
    ...provided,
    backgroundColor: "hsl(0,0%,50%)"
  })
};
