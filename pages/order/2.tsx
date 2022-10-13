import type { NextPage } from "next";
import { TopHeaderOrder } from "../../widgets/top-header-order";
import { ChangeEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TextFieldComponent } from "../../components/textfield-component";
import { ButtonComponent } from "../../components/button-component";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import InputMask from "react-input-mask";

const OrderSecond: NextPage = () => {
  const [phoneNumber, setPhoneNumber] = useState("+7 | ");
  const [phoneFocused, setPhoneFocused] = useState(false);

  const setPhoneValue = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setPhoneNumber(inputValue);
  };

  const focusPhone = () => {
    setPhoneFocused(true);
  };
  const blurPhone = () => {
    setPhoneFocused(false);
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
              onChange={() => {}}
            ></TextFieldComponent>
          </Box>
        </div>
        <div className="col-12 mb-3">
          <Box
            className="search-input-wrapper ps-1"
            sx={{ borderRadius: "16px" }}
          >
            <TextField
              id="input-with-sx"
              multiline
              value={phoneNumber}
              variant="outlined"
              fullWidth={true}
              size={"small"}
              InputProps={{
                style: { color: phoneFocused ? "#000" : "#8C949C" },
              }}
              onChange={setPhoneValue}
              onFocus={focusPhone}
              onBlur={blurPhone}
            />
          </Box>
        </div>
      </div>

      <div className="pt-5 pb-5"></div>
      <div className="pt-5 pb-5"></div>

      <Divider className="w-100 mb-3 "></Divider>
      <ButtonComponent color="black" onClickHandler={() => {}}>
        Далее
      </ButtonComponent>
    </div>
  );
};

export default OrderSecond;
