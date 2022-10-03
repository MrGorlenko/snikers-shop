import Image from "next/image";
import React, { FunctionComponent } from "react";
import Divider from "@mui/material/Divider";
import BasketIcon from "../components/basket-icon";
import { GoBackButton } from "./go-back-button";
import { HeaderOptions } from "../interfaces";
import { useRouter } from "next/router";

export const TopHeader: FunctionComponent<HeaderOptions> = ({ isBack }) => {
  const router = useRouter();

  const goToMain = () => {
    router.push("/");
  };

  return (
    <header className="mb-3">
      <div className="pt-3 d-flex flex-wrap justify-content-between align-items-center">
        <div className="col-2 d-flex justify-content-start">
          {isBack ? <GoBackButton></GoBackButton> : ""}
        </div>
        <div className="col-8 d-flex align-items-center">
          <Image
            src={require("../assets/icons/logo.svg")}
            width={211}
            height={24}
            alt="logo"
            onClick={goToMain}
          ></Image>
        </div>
        <div className="col-2 d-flex justify-content-end position-relative">
          <BasketIcon></BasketIcon>
        </div>
        <Divider className="w-100 mt-3"></Divider>
      </div>
    </header>
  );
};
