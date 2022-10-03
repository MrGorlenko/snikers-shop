import Button from "@mui/material/Button/Button";
import React, { FunctionComponent } from "react";

interface Button {
  children: string;
  color: string;
  onClickHandler(): any;
}

export const ButtonComponent: FunctionComponent<Button> = ({
  children,
  color,
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

  let className: string = "";

  if (color === "red") {
    sx.backgroundColor = "#FF1515";
    sx.color = "#fff";
  }
  if (color === "gray") sx.backgroundColor = "#F4F4F4;";
  if (color === "black") {
    sx.backgroundColor = "#101010";
    sx.color = "#fff";
  }

  return (
    <Button sx={sx} onClick={onClickHandler} className={` ${className} `}>
      {children}
    </Button>
  );
};
