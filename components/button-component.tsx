import Button from "@mui/material/Button/Button";
import React, { FunctionComponent } from "react";

interface Button {
  children: string | JSX.Element;
  color: string;
  disabled?: boolean;
  onClickHandler(): any;
}

export const ButtonComponent: FunctionComponent<Button> = ({
  children,
  color,
  disabled = false,
  onClickHandler,
}) => {
  const sx = {
    fontWeight: 700,
    fontSize: 14,
    height: 50,
    width: "100%",
    lineHeight: "17px",
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    borderRadius: "25px",
    backgroundColor: "",
    color: "#101010",
  };

  let classesDisabled = "";

  if (color === "red") {
    sx.backgroundColor = "#FF1515";
    sx.color = "#fff";
  }
  if (color === "gray") sx.backgroundColor = "#F4F4F4;";
  if (color === "black") {
    sx.backgroundColor = "#101010";
    sx.color = "#fff";
    classesDisabled = "black-disabled";
  }

  return (
    <Button
      classes={{ disabled: classesDisabled }}
      sx={sx}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </Button>
  );
};
