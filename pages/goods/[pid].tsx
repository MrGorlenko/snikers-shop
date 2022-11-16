import React, { useEffect, useState } from "react";
import type {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  GetServerSideProps,
} from "next";
import { useRouter } from "next/router";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { addToBasket } from "../../features";

import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Image from "next/image";

import { GoodPage, Basket, GoodForBasket, Good } from "../../interfaces";
import { TopHeader } from "../../widgets/top-header";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";

import axios from "axios";

import "swiper/css";
import "swiper/css/pagination";
import Link from "next/link";

const GoodPage: NextPage<GoodPage> = ({ good, goods }: GoodPage) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [inBasket, setInBasket] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedPrice, setSelectedPrice] = useState(0);
  const [selectedDiscountPrice, setSelectedDiscountPrice] = useState(0);
  const [readyToBasket, setReadyToBasket] = useState(false);
  const [selectedSizes, setSelectedSizes] = useState([""]);
  const goodsInBasket = useSelector((state: Basket) => state.basket.goods);

  const sameGoods = goods.filter((goodItem) => goodItem.title === good.title);

  useEffect(() => {
    const condition = goodsInBasket
      .map((goodinBasket) => goodinBasket.id)
      .includes(good.id);

    // const colorCondition = goodsInBasket.filter((goodInBasket)=>goodInBasket.id === good.id)

    if (condition) {
      const selected_sizes = goodsInBasket
        .filter((goodInBasket) => goodInBasket.id === good.id)
        .map((goodInBasket) => goodInBasket.selected_size);
      setSelectedSize(selected_sizes[0]);
      setSelectedSizes(selected_sizes);
      setReadyToBasket(true);
      setInBasket(true);
    } else {
      setSelectedSize("");
      setSelectedSizes([""]);
      setReadyToBasket(false);
      setInBasket(false);
    }
  }, [goodsInBasket, good.id]);

  // Это кнопочки с размерами
  const handleSizeSelection: any = (
    size: string,
    price: number,
    discount_price: number
  ) => {
    setSelectedDiscountPrice(discount_price);
    setSelectedPrice(price);
    setSelectedSize(size);
    setReadyToBasket(true);
    if (selectedSizes.includes(size)) {
      // && в корзине (то есть на будущее в списке selectedSizes)
      setInBasket(true);
    } else {
      setInBasket(false);
    }
  };

  // это конкретно "выбрать размер"
  const selectSizeHandler: any = () => {
    if (selectedSize === "") return;
    setReadyToBasket(true);
  };

  // это конкретно "добавить в корзину уже"
  const addToBasketHandler = () => {
    // это для отслеживания добавленных размеров (и подсвечивании)
    const newSizes: string[] = [...selectedSizes, selectedSize];
    setSelectedSizes(newSizes);
    const goodToBasket: GoodForBasket = {
      ...good,
      amount_in_basket: 1,
      selected_size: selectedSize,
      selected_price: selectedPrice,
      selected_discount_price: selectedDiscountPrice,
    };
    setInBasket(true);
    dispatch(addToBasket(goodToBasket));
  };

  const goToBasket: any = () => {
    router.push("/basket");
  };

  return (
    <div className="container pb-3">
      <TopHeader isBack={true}></TopHeader>

      <div style={{ width: 320, height: 320 }} className="m-auto">
        <Swiper
          modules={[Pagination]}
          spaceBetween={50}
          slidesPerView={1}
          pagination={{
            clickable: false,
            type: "bullets",
            modifierClass: "goods-",
            bulletActiveClass: "active-bullet",
            bulletClass: "bullet",
          }}
        >
          {good.images.map((img, index) => (
            <SwiperSlide key={index}>
              <Image
                src={img}
                width="320"
                height={"320"}
                objectFit="cover"
                style={{ borderRadius: 30 }}
                alt={good.title}
              ></Image>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Typography
        variant="subtitle1"
        component={"span"}
        sx={{
          fontSize: 13,
          lineHeight: "16px",
          display: "block",
          marginTop: "1.5em",
        }}
      >
        {good.brand}
      </Typography>

      <Typography variant="h1" sx={{ fontSize: 24, fontWeight: 700 }}>
        {good.title}
      </Typography>

      <div className="mt-3 d-flex flex-wrap">
        {sameGoods.length > 1
          ? sameGoods.reverse().map((goodItem) => (
              <Link key={goodItem.id} href={"/goods/" + goodItem.id}>
                <div className="me-2 mb-2">
                  <Image
                    width={100}
                    height={100}
                    objectFit="cover"
                    className={
                      good.color === goodItem.color ? "black-border" : ""
                    }
                    style={{
                      borderRadius: 30,
                    }}
                    src={goodItem.images[0]}
                    alt={goodItem.color}
                  ></Image>
                </div>
              </Link>
            ))
          : ""}
      </div>

      <Divider className="w-100 mt-3 mb-3"></Divider>

      <Typography
        variant="subtitle1"
        component={"span"}
        sx={{
          fontSize: 13,
          lineHeight: "16px",
          fontWeight: 600,
        }}
      >
        Выберите размер
      </Typography>

      <div className="d-flex flex-wrap mt-4">
        {good.sizes.map((size) => (
          <Button
            key={size.id}
            className={`${
              selectedSizes.includes(size.size.toString()) ||
              selectedSize === size.size.toString()
                ? "black-button"
                : "gray-button"
            }`}
            sx={{
              width: "20%",
              marginRight: 1,
              marginBottom: 1,
              borderRadius: "6px",
              flexDirection: "column",
            }}
            onClick={() =>
              handleSizeSelection(
                size.size.toString(),
                size.price,
                size.discount_price
              )
            }
          >
            <Typography
              variant="body1"
              sx={{ color: "#101010", fontSize: 16, fontWeight: 600 }}
            >
              {size.size}
            </Typography>
            <Typography
              variant="body2"
              component={"p"}
              sx={{ color: "#8C949C", fontSize: 13, fontWeight: 500 }}
            >
              {size.discount_price} ₽
            </Typography>
          </Button>
        ))}
      </div>

      <Divider className="w-100 mt-3 mb-3"></Divider>

      <Typography
        variant="subtitle1"
        component={"span"}
        sx={{
          fontSize: 13,
          lineHeight: "16px",
          fontWeight: 600,
        }}
      >
        Описание
      </Typography>

      <Typography
        variant="body1"
        component={"p"}
        sx={{ fontWeight: 400, fontSize: 13, lineHeight: "16px" }}
      >
        {good.description}
      </Typography>

      <Divider className="w-100 mt-3 mb-3"></Divider>

      {inBasket ? (
        <Button
          className="black-button w-100"
          sx={{ borderRadius: "50px", height: "50px" }}
          onClick={goToBasket}
        >
          Перейти в корзину
        </Button>
      ) : readyToBasket ? (
        <Button
          className="black-button w-100"
          sx={{ borderRadius: "50px", height: "50px" }}
          onClick={addToBasketHandler}
        >
          Добавить в корзину ({selectedDiscountPrice} ₽)
        </Button>
      ) : (
        <Button
          className="gray-button w-100"
          sx={{ borderRadius: "50px", height: "50px" }}
          disabled
        >
          Выбрать размер
        </Button>
      )}
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const request = await axios.get("https://api.thepara.shop/goods/goods/");
  const pathes = request.data.map((good: Good) => {
    return { params: { pid: String(good.id) } };
  });

  return {
    paths: pathes,
    fallback: false,
  };
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const id = params!.pid;
  const resAllGoods = await axios.get("https://api.thepara.shop/goods/goods/");
  const resOneGood = await axios.get(
    "https://api.thepara.shop/goods/goods/" + id + "/"
  );
  const good = resOneGood.data;

  const goods = resAllGoods.data;

  return { props: { good, goods } };
};

export default GoodPage;
