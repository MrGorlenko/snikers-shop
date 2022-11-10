import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { TopHeaderOrder } from "../../widgets/top-header-order";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TextFieldComponent } from "../../components/textfield-component";
import { ButtonComponent } from "../../components/button-component";
import { setAddressInfo } from "../../features/order";
import { OdrerState } from "../../interfaces";

const OrderFirst: NextPage = () => {
  const router = useRouter();
  const customerInfo: OdrerState = useSelector((state: OdrerState) => state);
  const dispatch = useDispatch();
  const [disabledNextButton, setDisabledNextButton] = useState(true);
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [houseNumber, setHouseNumber] = useState("");
  const [apartmentNumber, setApartmentNumber] = useState("");
  const [entryNumber, setEntryNumber] = useState("");
  const [intercome, setIntercome] = useState("");
  const [floorNumber, setFloorNumber] = useState("");
  const [postIndex, setPostIndex] = useState("");
  const [comment, setComment] = useState("");

  const setCityHandler = (city: string) => {
    setCity(city);
  };

  const setStreetHandler = (street: string) => {
    setStreet(street);
  };

  const setHouseNumberHandler = (number: string) => {
    setHouseNumber(number);
  };

  const setApartmentNumberHandler = (number: string) => {
    setApartmentNumber(number);
  };

  const setEntryNumberHandler = (number: string) => {
    setEntryNumber(number);
  };

  const setIntercomeHandler = (intercome: string) => {
    setIntercome(intercome);
  };

  const setFloorNumberHandler = (number: string) => {
    setFloorNumber(number);
  };

  const setPostIndexHandler = (index: string) => {
    setPostIndex(index);
  };

  const setCommentHandler = (comment: string) => {
    setComment(comment);
  };

  useEffect(() => {
    city !== "" && street !== "" && houseNumber !== "" && postIndex !== ""
      ? setDisabledNextButton(false)
      : setDisabledNextButton(true);
  }, [city, street, houseNumber, postIndex]);

  useEffect(() => {
    setCityHandler(customerInfo.order.order.city);
    setStreetHandler(customerInfo.order.order.street);
    setHouseNumberHandler(customerInfo.order.order.houseNumber);
    setPostIndexHandler(customerInfo.order.order.postIndex);
    if (customerInfo.order.order.apartmentNumber)
      setApartmentNumberHandler(customerInfo.order.order.apartmentNumber);
    if (customerInfo.order.order.entryNumber)
      setEntryNumberHandler(customerInfo.order.order.entryNumber);
    if (customerInfo.order.order.intercome)
      setIntercomeHandler(customerInfo.order.order.intercome);
    if (customerInfo.order.order.floorNumber)
      setFloorNumberHandler(customerInfo.order.order.floorNumber);
    if (customerInfo.order.order.comment)
      setCommentHandler(customerInfo.order.order.comment);
  }, [customerInfo]);

  const goToNextStep = () => {
    const data = {
      city,
      street,
      houseNumber,
      apartmentNumber,
      entryNumber,
      intercome,
      floorNumber,
      postIndex,
      comment,
    };
    dispatch(setAddressInfo(data));
    router.push("/order/2");
  };

  return (
    <div className="container">
      <TopHeaderOrder progressValue={33}></TopHeaderOrder>
      <Typography
        className="mb-4 mt-3"
        sx={{
          fontSize: 18,
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        Адрес доставки
      </Typography>
      <div className="row pb-5 mb-5">
        <div className="col-12 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Город"
              value={city}
              onChange={setCityHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-12 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Улица"
              value={street}
              onChange={setStreetHandler}
            ></TextFieldComponent>{" "}
          </Box>
        </div>
        <div className="col-4 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Дом"
              value={houseNumber}
              onChange={setHouseNumberHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-4 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Квартира"
              value={apartmentNumber}
              onChange={setApartmentNumberHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-4 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Подъезд"
              value={entryNumber}
              onChange={setEntryNumberHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-4 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Домофон"
              value={intercome}
              onChange={setIntercomeHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-4 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Этаж"
              value={floorNumber}
              onChange={setFloorNumberHandler}
            ></TextFieldComponent>
          </Box>
        </div>

        <div className="col-4 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Индекс"
              value={postIndex}
              onChange={setPostIndexHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-12 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Комментарий"
              value={comment}
              onChange={setCommentHandler}
            ></TextFieldComponent>
          </Box>
        </div>
      </div>
      <Divider className="w-100 mb-3"></Divider>
      <ButtonComponent
        disabled={disabledNextButton}
        color="black"
        onClickHandler={goToNextStep}
      >
        Далее
      </ButtonComponent>
    </div>
  );
};

export default OrderFirst;
