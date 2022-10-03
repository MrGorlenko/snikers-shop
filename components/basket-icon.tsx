import React, { FunctionComponent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IconButton } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircleIcon from "@mui/icons-material/Circle";
import { useSelector } from "react-redux";
import { Basket, GoodForBasket } from "../interfaces";

const BasketIcon: FunctionComponent = ({}) => {
  const router = useRouter();

  const goodsAmount: number = useSelector(
    (state: Basket) => state.basket.goods
  ).length;

  const goToBasket = () => {
    router.push("/basket");
  };

  return (
    <React.Fragment>
      <IconButton style={{ width: 40, height: 40 }} onClick={goToBasket}>
        <Image
          src={require("../assets/icons/basket.svg")}
          width={22}
          height={24}
          alt="basket"
        ></Image>
      </IconButton>

      {goodsAmount > 0 ? (
        <React.Fragment>
          <CircleIcon
            color="error"
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            onClick={goToBasket}
          ></CircleIcon>
          <Typography
            variant="body1"
            fontSize={15}
            color="white"
            textAlign={"center"}
            style={{
              width: 20,
              height: 20,
              position: "absolute",
              bottom: 0,
              right: 0,
            }}
            onClick={goToBasket}
          >
            {goodsAmount}
          </Typography>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default BasketIcon;
