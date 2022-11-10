import React, { FunctionComponent } from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { Good } from "../interfaces";

interface CatalogItemProp extends Good {
  minPrice: number;
  className: string;
  img: string;
  handleGoodClick(id: number): any;
}

const priceLabels = (price: number) => {
  return <Typography>от {price} ₽</Typography>;
};

const CatalogItem: FunctionComponent<CatalogItemProp> = ({
  id,
  title,
  className,
  img,
  brand,
  minPrice,
  sizes,
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

          {priceLabels(minPrice)}

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
            {sizes
              .map((size, index) => {
                return index < 4 ? (
                  <div key={index.toString()} className="size-element-catalog">
                    {size.size}
                  </div>
                ) : (
                  <div key="tripleDots" className="size-element-catalog">
                    ...
                  </div>
                );
              })
              .filter((value, index) => index < 5)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
