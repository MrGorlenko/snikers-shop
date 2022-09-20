import React, { FunctionComponent } from "react";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";

export const GoBackButton: FunctionComponent = () => {
  const router: NextRouter = useRouter();

  const goBack: any = () => {
    router.back();
  };

  return (
    <IconButton onClick={goBack}>
      <Image
        src={require("../assets/icons/arrow-back.svg")}
        width={16}
        height={14}
        alt="back"
      ></Image>
    </IconButton>
  );
};
