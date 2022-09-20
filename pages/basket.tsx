import { Divider, List, ListItem, Typography } from "@mui/material";
import type { NextPage } from "next";
import React, { useState } from "react";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { Button } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Basket, GoodForBasket } from "../interfaces";
import { GoodCounter } from "../widgets/good-conter";
import { TopHeader } from "../widgets/top-header";
import { BasketListItem } from "../widgets/basket-list-item";

import { removeFromBasket, incrementGood, decrementGood } from "../features";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";

import { RemoveGoodModal } from "../widgets/remove-good-modal";

const Basket: NextPage = () => {
  const dispatch = useDispatch();
  const goods: GoodForBasket[] = useSelector(
    (state: Basket) => state.basket.goods
  );
  const [showModal, setShowModal] = useState(false);

  const removeFromBasketHandler: any = (index: number) => {
    // dispatch(removeFromBasket(index));
    setShowModal(true);
    // goodForRemoving = goods[index];
  };

  const totalWithNoDiscount = goods
    .map((good: GoodForBasket) => good.price * good.amount_in_basket)
    .reduce((prev, next) => prev + next);
  const totalWithDiscount = goods
    .map((good: GoodForBasket) => good.discount_price * good.amount_in_basket)
    .reduce((prev, next) => prev + next);

  const increment = (index: number) => {
    if (goods[index].amount_in_basket >= goods[index].amount) return;
    dispatch(incrementGood(index));
  };
  const decrement = (index: number) => {
    if (goods[index].amount_in_basket <= 1) return;
    dispatch(decrementGood(index));
  };

  // let goodForRemoving = {
  //   title: "",
  //   img: "",
  //   selected_size: "",
  //   price: 0,
  //   wrapperClassName: "",
  // };

  const renderedPosts: JSX.Element[] = goods.map(
    (good: GoodForBasket, index: number) => (
      <BasketListItem
        key={good.id + (index * 2 + Math.random())}
        img={good.img}
        title={good.title}
        size={good.selected_size}
        price={good.price}
        discount_price={good.discount_price}
        childrenCounter={
          <GoodCounter
            classes="counter-absolute-widget"
            incrementHandler={() => increment(index)}
            decrementHandler={() => decrement(index)}
          >
            {good.amount_in_basket}
          </GoodCounter>
        }
        childrenDelete={
          <Button
            sx={{
              position: "absolute",
              right: 0,
              top: 0,
              justifyContent: "flex-end",
            }}
            onClick={() => removeFromBasketHandler(index)}
          >
            <DeleteOutlineIcon sx={{ color: "#101010" }}></DeleteOutlineIcon>
          </Button>
        }
      ></BasketListItem>
    )
  );

  // const areYouSure: JSX.Element = (
  //   <RemoveGoodModal
  //     img={goodForRemoving.img}
  //     title={goodForRemoving.title}
  //     size={goodForRemoving.selected_size}
  //     price={goodForRemoving.price}
  //     wrapperClassName={""}
  //   ></RemoveGoodModal>
  // );

  return (
    <div className="container pb-3">
      <TopHeader isBack={true}></TopHeader>
      <Typography
        variant="h2"
        sx={{
          fontSize: 18,
          fontWeight: 600,
          lineHeight: "22px",
          marginTop: "1.5em",
        }}
      >
        Корзина
      </Typography>
      <List>{renderedPosts}</List>

      <div>
        <List className="pt-0">
          <ListItem classes={{ root: "basket-list-total-item" }}>
            Товаров в корзине
            <ListItemSecondaryAction
              classes={{ root: "basket-list-item-number" }}
            >
              <span>{goods.length}</span>
            </ListItemSecondaryAction>
          </ListItem>
          <ListItem classes={{ root: "basket-list-total-item" }}>
            Товаров на сумму
            <ListItemSecondaryAction
              classes={{ root: "basket-list-item-number" }}
            >
              <span>{totalWithNoDiscount} ₽</span>
            </ListItemSecondaryAction>
          </ListItem>
          {totalWithDiscount !== totalWithNoDiscount ? (
            <ListItem
              classes={{
                root: "basket-list-total-item basket-list-item-number-red",
              }}
            >
              Скидка
              <ListItemSecondaryAction
                classes={{
                  root: "basket-list-item-number basket-list-item-number-red",
                }}
              >
                <span>{totalWithNoDiscount - totalWithDiscount} ₽</span>
              </ListItemSecondaryAction>
            </ListItem>
          ) : (
            ""
          )}
          <ListItem classes={{ root: "basket-list-total-item bold-font mt-3" }}>
            Итого
            <ListItemSecondaryAction
              classes={{ root: "basket-list-item-number bold-font " }}
            >
              <span>{totalWithDiscount} ₽</span>
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </div>
      <Divider component={"div"} className="mt-2 mb-4"></Divider>
      <Button
        className="black-button w-100"
        sx={{ height: 50, borderRadius: "25px" }}
      >
        Перейти к оформлению
      </Button>
    </div>
  );
};

export default Basket;
