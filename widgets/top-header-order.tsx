import React, { FunctionComponent } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { GoBackButton } from "./go-back-button";
import Typography from "@mui/material/Typography";

interface TopHeaderOrder {
  progressValue: number;
}

export const TopHeaderOrder: FunctionComponent<TopHeaderOrder> = ({
  progressValue,
}) => {
  return (
    <header className="mb-3">
      <div className="row align-items-center pt-3 pb-3">
        <div className="col-2">
          <GoBackButton></GoBackButton>
        </div>
        <div className="col-8">
          <Typography
            variant="h4"
            component={"h4"}
            sx={{
              fontSize: 18,
              lineHeight: "22px",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Оформление заказа
          </Typography>
        </div>
        <div className="col-2"></div>
      </div>
      <LinearProgress
        variant="determinate"
        value={progressValue}
        classes={{
          colorPrimary: "progress-primar",
          colorSecondary: "progress-second",
        }}
        sx={{ transition: "0.3s ease" }}
      ></LinearProgress>
    </header>
  );
};
