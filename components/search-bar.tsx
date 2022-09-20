import React, { FunctionComponent } from "react";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";

export const SearchBar: FunctionComponent = () => {
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
      <TextField
        id="input-with-sx"
        label="Поиск по каталогу"
        multiline
        variant="outlined"
        fullWidth={true}
        size={"small"}
        InputProps={{ style: {} }}
        InputLabelProps={{
          style: {
            color: "#8C949C",
          },
        }}
      />
    </Box>
  );
};
