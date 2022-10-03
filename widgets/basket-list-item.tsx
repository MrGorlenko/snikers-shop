import Avatar from "@mui/material/Avatar/Avatar";
import Button from "@mui/material/Button/Button";
import ListItem from "@mui/material/ListItem/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText/ListItemText";
import Typography from "@mui/material/Typography";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { GoodCounter } from "../widgets/good-conter";
import React, { FunctionComponent } from "react";
import Divider from "@mui/material/Divider/Divider";

interface BasketItem {
  img: string;
  title: string;
  size: string;
  price: number;
  discount_price: number;
  childrenCounter: JSX.Element;
  childrenDelete: JSX.Element;
}

export const BasketListItem: FunctionComponent<BasketItem> = ({
  img,
  title,
  size,
  price,
  discount_price,
  childrenCounter,
  childrenDelete,
}) => {
  return (
    <React.Fragment>
      <ListItem
        style={{ paddingLeft: 0, paddingRight: 0, paddingTop: "0.5em" }}
      >
        <ListItemAvatar
          className="align-self-start"
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Avatar
            sx={{ width: 100, height: 100, borderRadius: "20px" }}
            variant="square"
            src={img}
          ></Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{ paddingLeft: 2, position: "relative" }}
          primary={
            <React.Fragment>
              <Typography
                sx={{
                  fontSize: 13,
                  lineHeight: "16px",
                  width: 186,
                  display: "block",
                }}
                variant="subtitle1"
                component={"span"}
              >
                {title}
              </Typography>
              {childrenDelete}
            </React.Fragment>
          }
          secondary={
            <React.Fragment>
              <span
                className="gray-button d-flex align-items-center justify-content-center"
                style={{
                  width: 22,
                  height: 20,
                  borderRadius: "6px",
                  fontSize: 12,
                  fontWeight: 600,
                  marginTop: "0.5em",
                  marginBottom: "0.5em",
                }}
              >
                {size}
              </span>

              {price === discount_price ? (
                <Typography
                  component={"span"}
                  sx={{ fontSize: 17, fontWeight: 600, color: "#101010" }}
                >
                  {discount_price} ₽
                </Typography>
              ) : (
                <React.Fragment>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "16px",
                      textDecoration: "line-through",
                      color: "#101010",
                    }}
                    component={"span"}
                  >
                    {price} ₽
                  </Typography>{" "}
                  <Typography
                    component={"span"}
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                      color: "#FF1515",
                      position: "relative",
                      left: "6px",
                    }}
                  >
                    {discount_price} ₽
                  </Typography>
                </React.Fragment>
              )}
              {childrenCounter}
            </React.Fragment>
          }
        ></ListItemText>
      </ListItem>
      <Divider
        component="li"
        sx={{
          borderColor: "#E8E8E8",
          borderBottomWidth: "0.2px",
          borderStyle: "none",
          height: "0.5px",
          backgroundColor: "#E8E8E8",
          marginTop: "0.5em",
          marginBottom: "0.5em",
        }}
      ></Divider>
    </React.Fragment>
  );
};
