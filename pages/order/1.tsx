import type { NextPage } from "next";
import { TopHeaderOrder } from "../../widgets/top-header-order";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { TextFieldComponent } from "../../components/textfield-component";
import { ButtonComponent } from "../../components/button-component";

const OrderFirst: NextPage = () => {
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
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
              onChange={() => {}}
            ></TextFieldComponent>
          </Box>
        </div>
      </div>
      <Divider className="w-100 mb-3"></Divider>
      <ButtonComponent color="black" onClickHandler={() => {}}>
        Далее
      </ButtonComponent>
    </div>
  );
};

export default OrderFirst;
