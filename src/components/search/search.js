import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { cityOptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="Search for city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={cityOptions}
      isSearchable
    />
  );
};

export default Search;
