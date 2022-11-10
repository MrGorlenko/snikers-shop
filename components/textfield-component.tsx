import React, { useState, FunctionComponent, ChangeEvent } from "react";
import TextField from "@mui/material/TextField";

interface TextFieldComponent {
  label: string;
  value: string;
  onChange(text: string): any;
}

export const TextFieldComponent: FunctionComponent<TextFieldComponent> = ({
  label,
  value,
  onChange,
}) => {
  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  return (
    <TextField
      id="input-with-sx"
      placeholder={label}
      label={""}
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
      onChange={onChangeHandler}
    />
  );
};
