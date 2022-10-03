import { Divider, List, ListItem, Typography } from "@mui/material";
import type { NextPage } from "next";
import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
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
  const router = useRouter();
  const dispatch = useDispatch();
  const goods: GoodForBasket[] = useSelector(
    (state: Basket) => state.basket.goods
  );
  const [showModal, setShowModal] = useState(false);
  const [modalZIndex, setModalZIndex] = useState("-1");
  const [modalClassName, setModalClassName] = useState("");
  const [removedIndex, setRemovedIndex] = useState(0);
  const [loadRemovingModal, setLoadRemovingModal] = useState(false);

  const removeFromBasketHandler: any = (index: number) => {
    setRemovedIndex(index);
    removingGood.title = goods[index].title;
    setShowModal(true);
  };

  const deleteFromBasketHandler: any = (index: number) => {
    dispatch(removeFromBasket(index));
  };

  const removingGood = {
    title: "",
  };

  useEffect(() => {
    setTimeout(() => {
      setLoadRemovingModal(true);
    }, 350);
  });

  useEffect(() => {
    if (!showModal) {
      setModalClassName("removed-remove-modal");
      setTimeout(() => {
        setModalZIndex("-1");
      }, 300);
    } else {
      setModalZIndex("2");
      setTimeout(() => {
        setModalClassName("active-remove-modal");
      }, 300);
    }
  }, [showModal, modalZIndex]);

  const totalWithNoDiscount: number = goods
    .map((good: GoodForBasket) => good.selected_price * good.amount_in_basket)
    .reduce((prev, next) => prev + next, 0);
  const totalWithDiscount: number = goods
    .map(
      (good: GoodForBasket) =>
        good.selected_discount_price * good.amount_in_basket
    )
    .reduce((prev, next) => prev + next, 0);

  const increment = (index: number) => {
    if (goods[index].amount_in_basket >= goods[index].amount) return;
    dispatch(incrementGood(index));
  };
  const decrement = (index: number) => {
    if (goods[index].amount_in_basket <= 1) return;
    dispatch(decrementGood(index));
  };

  const goToOrder = () => {
    router.push("/order/1");
  };

  const GoodsInBasket: JSX.Element[] = goods.map(
    (good: GoodForBasket, index: number) => (
      <BasketListItem
        key={good.id + (index * 2 + Math.random())}
        img={good.imgs[0]}
        title={good.title}
        size={good.selected_size}
        price={good.selected_price}
        discount_price={good.selected_discount_price}
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

  const areYouSure: JSX.Element = (
    <RemoveGoodModal
      img={goods[removedIndex].imgs[0]}
      title={goods[removedIndex].title}
      size={goods[removedIndex].selected_size}
      price={goods[removedIndex].selected_price}
      zIndex={modalZIndex}
      wrapperClassName={modalClassName}
      switchOffHandler={() => {
        setShowModal(false);
      }}
      reject={() => setShowModal(false)}
      deleteFunc={() => deleteFromBasketHandler(removedIndex)}
    ></RemoveGoodModal>
  );

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
      <List>{GoodsInBasket}</List>

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
        onClick={goToOrder}
      >
        Перейти к оформлению
      </Button>

      {loadRemovingModal ? <div>{areYouSure}</div> : ""}
    </div>
  );
};

export default Basket;
