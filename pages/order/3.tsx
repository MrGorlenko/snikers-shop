import type { NextPage } from "next";
import React from "react";
import { TopHeaderOrder } from "../../widgets/top-header-order";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import Divider from "@mui/material/Divider";
import axios from "axios";
import { OdrerState, GoodForBasket } from "../../interfaces";
import { ButtonComponent } from "../../components/button-component";
const OrderFinal: NextPage = () => {
  const orderInfo = useSelector((state: OdrerState) => state.order.order);
  const basketInfo = useSelector((state: OdrerState) => state.basket.goods);
  const basketInfoForReq = basketInfo.map((goodInBacket: GoodForBasket) => {
    return {
      good: goodInBacket.id,
      amount_in_basket: goodInBacket.amount_in_basket,
      selected_size: goodInBacket.selected_size,
    };
  });
  const overallCost: number = basketInfo
    .map((good: GoodForBasket) => good.selected_price * good.amount_in_basket)
    .reduce((prev, next) => prev + next, 0);
  const overallCostDiscount = basketInfo
    .map(
      (good: GoodForBasket) =>
        good.selected_discount_price * good.amount_in_basket
    )
    .reduce((prev, next) => prev + next, 0);

  const reqOrder = () => {
    const orderInfoObject = {
      city: orderInfo.city,
      street: orderInfo.street,
      house_number: orderInfo.houseNumber,
      apartment_number: orderInfo.apartmentNumber,
      entry_number: orderInfo.entryNumber,
      intercom: orderInfo.intercome,
      floor_number: orderInfo.floorNumber,
      post_index: orderInfo.postIndex,
      name: orderInfo.name,
      phone: orderInfo.phone,
      goods_in_basket: basketInfoForReq,
    };

    axios
      .post("https://api.thepara.shop/orders/delivery_info/", orderInfoObject)
      .then((res) => console.log(res));
  };
  return (
    <div className="container">
      <TopHeaderOrder progressValue={100}></TopHeaderOrder>
      <Typography
        className="mb-4"
        sx={{
          fontSize: 18,
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        Контактная информация
      </Typography>
      <Typography
        className="mb-2"
        sx={{
          fontSize: 13,
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        Адрес доставки
      </Typography>
      <Typography
        className="mb-2"
        sx={{
          fontSize: 13,
          lineHeight: "22px",
          fontWeight: 400,
        }}
      >
        {orderInfo.city}, ул. {orderInfo.street} {orderInfo.houseNumber}
        {orderInfo.apartmentNumber !== ""
          ? ", кв. " + orderInfo.apartmentNumber
          : ""}
        {orderInfo.entryNumber !== ""
          ? ", подъезд " + orderInfo.entryNumber
          : ""}
        {orderInfo.intercome !== "" ? ", домофон " + orderInfo.intercome : ""}
        {orderInfo.floorNumber !== ""
          ? ", этаж " + orderInfo.floorNumber
          : ""}, {orderInfo.postIndex}
      </Typography>

      {orderInfo.comment !== "" ? (
        <Typography
          className="mb-2"
          sx={{
            fontSize: 13,
            lineHeight: "22px",
            fontWeight: 400,
          }}
        >
          Комментарий: {orderInfo.comment}
        </Typography>
      ) : (
        ""
      )}

      <Divider className="w-100 mb-3 "></Divider>
      <Typography
        className="mb-4 mt-3"
        sx={{
          fontSize: 13,
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        Контактная информация
      </Typography>
      <Typography
        className="mt-2"
        sx={{
          fontSize: 13,
          lineHeight: "22px",
          fontWeight: 400,
        }}
      >
        {orderInfo.name}
      </Typography>
      <Typography
        className="mt-2 mb-4"
        sx={{
          fontSize: 13,
          lineHeight: "22px",
          fontWeight: 400,
        }}
      >
        {orderInfo.phone}
      </Typography>
      <Divider className="w-100 mb-3 "></Divider>
      <Typography
        className="mb-3 mt-3"
        sx={{
          fontSize: 13,
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        Заказ
      </Typography>
      <div className="row">
        <div className="col-6">
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: "22px",
              fontWeight: 400,
            }}
          >
            Товаров в заказе
          </Typography>
        </div>
        <div className="col-6">
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: "22px",
              fontWeight: 400,
              textAlign: "end",
            }}
          >
            {basketInfo.length}
          </Typography>
        </div>

        <div className="col-6">
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: "22px",
              fontWeight: 400,
            }}
          >
            Товаров на сумму
          </Typography>
        </div>
        <div className="col-6">
          <Typography
            sx={{
              fontSize: 13,
              lineHeight: "22px",
              fontWeight: 400,
              textAlign: "end",
            }}
          >
            {overallCost} ₽
          </Typography>
        </div>

        {overallCost !== overallCostDiscount ? (
          <React.Fragment>
            <div className="col-6">
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: "22px",
                  fontWeight: 400,
                  color: "#FF1515",
                }}
              >
                Скидка
              </Typography>
            </div>
            <div className="col-6">
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: "22px",
                  fontWeight: 400,
                  textAlign: "end",
                  color: "#FF1515",
                }}
              >
                {overallCostDiscount - overallCost} ₽
              </Typography>
            </div>
          </React.Fragment>
        ) : (
          ""
        )}

        <div className="col-6 pt-5 mb-4">
          <Typography
            sx={{
              fontSize: 18,
              lineHeight: "22px",
              fontWeight: 700,
            }}
          >
            Итого
          </Typography>
        </div>
        <div className="col-6 pt-5 mb-4">
          <Typography
            sx={{
              fontSize: 18,
              lineHeight: "22px",
              fontWeight: 700,
              textAlign: "end",
            }}
          >
            {overallCostDiscount} ₽
          </Typography>
        </div>
      </div>

      <Divider className="w-100 mb-3 "></Divider>
      <ButtonComponent color="black" onClickHandler={reqOrder}>
        <React.Fragment>Оплатить {overallCostDiscount} ₽</React.Fragment>
      </ButtonComponent>
    </div>
  );
};

export default OrderFinal;
