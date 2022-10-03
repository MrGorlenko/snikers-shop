import React, { useState, FunctionComponent, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface TextFieldComponent {
  label: string;
  onChange(text: string): any;
}

export const TextFieldComponent: FunctionComponent<TextFieldComponent> = ({
  label,
  onChange,
}) => {
  const [value, setValue] = useState("");

  const textHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange(e.target.value);
  };

  return (
    <TextField
      id="input-with-sx"
      label={label}
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
      value={value}
      onChange={textHandler}
    />
  );
};
