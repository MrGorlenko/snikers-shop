import Button from "@mui/material/Button/Button";
import Divider from "@mui/material/Divider/Divider";
import Typography from "@mui/material/Typography";
import React, { FunctionComponent } from "react";
import { BasketListItem } from "./basket-list-item";

interface BasketItem {
  img: string;
  title: string;
  size: string;
  price: number;
  wrapperClassName: string;
}

export const RemoveGoodModal: FunctionComponent<BasketItem> = ({
  img,
  title,
  size,
  price,
  wrapperClassName,
}) => {
  return (
    <div className={`removeGoodModal ${wrapperClassName}`}>
      <div className="container">
        <Typography
          variant={"h4"}
          component={"h4"}
          className="text-align-center"
          sx={{ fontSize: 18, fontWeight: 600 }}
        >
          Вы уверены, что хотите удалить данный товар?
        </Typography>
        <Divider></Divider>
        <BasketListItem
          img={img}
          title={title}
          size={size}
          price={price}
          discount_price={price}
          childrenCounter={<span></span>}
          childrenDelete={<span></span>}
        ></BasketListItem>
        <Divider></Divider>
        <div className="row">
          <div className="col-6">
            <Button>Отмена</Button>
          </div>
          <div className="col-6">
            <Button>Удалить</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
