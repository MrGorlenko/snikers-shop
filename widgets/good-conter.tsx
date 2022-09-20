import React, { FunctionComponent, useState } from "react";
import { CounterNumbersWidget } from "../interfaces";
import { Button, Typography } from "@mui/material";

export const GoodCounter: FunctionComponent<CounterNumbersWidget> = ({
  children,
  classes = "",
  incrementHandler,
  decrementHandler,
}) => {
  const increment: any = () => {
    incrementHandler();
  };

  const decrement: any = () => {
    decrementHandler();
  };

  return (
    <span className={`d-flex counter-widget ${classes}`}>
      <Button
        style={{ minWidth: 30, padding: 0, borderRadius: "6px 0 0 6px" }}
        className="gray-button"
        onClick={decrement}
      >
        -
      </Button>
      <Typography
        sx={{
          width: 30,
          backgroundColor: "#F4F4F4",
          fontWeight: 600,
          color: "#101010",
          textAlign: "center",
          lineHeight: "30px",
        }}
        component={"span"}
      >
        {children}
      </Typography>
      <Button
        style={{ minWidth: 30, padding: 0, borderRadius: "0 6px 6px 0" }}
        className="gray-button"
        onClick={increment}
      >
        +
      </Button>
    </span>
  );
};
