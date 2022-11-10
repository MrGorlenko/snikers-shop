import type { NextPage } from "next";
import { TopHeaderOrder } from "../../widgets/top-header-order";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TextFieldComponent } from "../../components/textfield-component";
import { ButtonComponent } from "../../components/button-component";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { PhoneNumberMaskInput } from "../../widgets/phone-number-mask-input";
import { setCustomerPhone, setCustomerName } from "../../features/order";
import { OdrerState } from "../../interfaces";

const OrderSecond: NextPage = () => {
  const customerPhoneState = useSelector(
    (state: OdrerState) => state.order.order.phone
  );
  const customerName = useSelector(
    (state: OdrerState) => state.order.order.name
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const [name, setName] = useState(customerName);
  const [phoneNumber, setPhoneNumber] = useState(customerPhoneState);
  const [phoneNumberUnformated, setPhoneNumberUnformated] = useState("");

  const setPhoneNumberHandler = (phone: string) => {
    setPhoneNumber(phone);
  };

  const setPhoneNumberUnformatedHandler = (phone: string) => {
    setPhoneNumberUnformated(phone);
  };

  const setNameHandler = (name: string) => {
    setName(name);
  };

  useEffect(() => {
    if (phoneNumber.length === 18) {
      dispatch(setCustomerPhone(phoneNumber));
    }
    if (name !== "") dispatch(setCustomerName(name));
    if (name === "") dispatch(setCustomerName(""));
  });

  const goNextStep = () => {
    router.push("/order/3");
  };

  return (
    <div className="container">
      <TopHeaderOrder progressValue={66}></TopHeaderOrder>
      <Typography
        className="mb-4 mt-3"
        sx={{
          fontSize: 18,
          lineHeight: "22px",
          fontWeight: 600,
        }}
      >
        Контактная информация
      </Typography>
      <div className="row pb-5 mb-5 ">
        <div className="col-12 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextFieldComponent
              label="Имя"
              value={name}
              onChange={setNameHandler}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-12 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <PhoneNumberMaskInput
              value={phoneNumber}
              setFormattedValue={setPhoneNumberHandler}
              setUnformattedValue={setPhoneNumberUnformatedHandler}
            ></PhoneNumberMaskInput>
          </Box>
        </div>
      </div>

      <div className="pt-5 pb-5"></div>
      <div className="pt-5 pb-5"></div>

      <Divider className="w-100 mb-3 "></Divider>
      <ButtonComponent color="black" onClickHandler={goNextStep}>
        Далее
      </ButtonComponent>
    </div>
  );
};

export default OrderSecond;
