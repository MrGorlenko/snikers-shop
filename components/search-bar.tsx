import React, { FunctionComponent, useState } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import { TextFieldComponent } from "./textfield-component";

interface SearchBar {
  searchHandler(text: string): any;
}

export const SearchBar: FunctionComponent<SearchBar> = ({ searchHandler }) => {
  const [searchValue, setSearchValue] = useState("");

  const textHandler = (text: string) => {
    setSearchValue(text);
    searchHandler(text);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        borderRadius: "16px",
        height: 46,
      }}
      className="search-input-wrapper ps-3"
    >
      <SearchIcon
        sx={{
          color: "#8C949C",
          mr: 0,
          my: 0.5,
        }}
      />
      <TextFieldComponent
        label="Поиск по каталогу"
        value={searchValue}
        onChange={textHandler}
      ></TextFieldComponent>
    </Box>
  );
};
