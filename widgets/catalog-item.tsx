import React, { FunctionComponent, useState } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Good } from "../interfaces";

interface CatalogItemProp extends Good {
  className: string;
  handleGoodClick(id: number): any;
}

const priceLabels = (price: number, discount_price: number) => {
  return price === discount_price ? (
    <React.Fragment>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 700, fontSize: "16px" }}
      >
        {price} ₽
      </Typography>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <Typography
        variant="subtitle1"
        component={"span"}
        sx={{
          fontWeight: 400,
          fontSize: "16px",
          textDecoration: "line-through",
        }}
      >
        {price} ₽
      </Typography>
      <Typography
        variant="subtitle1"
        component={"span"}
        sx={{
          fontWeight: 700,
          fontSize: "16px",
          color: "#FF1515",
          position: "relative",
          left: "10px",
        }}
      >
        {discount_price} ₽
      </Typography>
    </React.Fragment>
  );
};

const CatalogItem: FunctionComponent<CatalogItemProp> = ({
  id,
  title,
  className,
  img,
  brand,
  price,
  discount_price,
  characteristics,
  handleGoodClick,
}) => {
  const handleClickHandler: any = (id: number) => {
    handleGoodClick(id);
  };

  return (
    <div className={className} onClick={() => handleClickHandler(id)}>
      <div className="row pt-2 pb-2 ps-1 pe-1">
        <div className={"col-12"}>
          <Image
            src={img}
            alt={title}
            width="165"
            height="194"
            objectFit="cover"
            style={{ borderRadius: 30 }}
          ></Image>

          {priceLabels(price, discount_price)}

          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: "13px", fontWeight: 400 }}
          >
            {brand}
          </Typography>

          <Typography
            variant="h6"
            component="h6"
            sx={{ fontSize: "13px", fontWeight: 400 }}
          >
            {title}
          </Typography>

          <div className="d-flex flex-wrap">
            {Array.isArray(characteristics[1].values) ? (
              characteristics[1].values
                .map((value: string, index: number) => {
                  return index < 4 ? (
                    <div
                      key={index.toString()}
                      className="size-element-catalog"
                    >
                      {value}
                    </div>
                  ) : (
                    <div key="tripleDots" className="size-element-catalog">
                      ...
                    </div>
                  );
                })
                .filter((value, index) => index < 5)
            ) : (
              <div className="size-element-catalog">
                {characteristics[1].values}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
