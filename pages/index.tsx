import type { NextPage, GetStaticProps } from "next";
import CatalogItem from "../widgets/catalog-item";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Good, MainPage, GoodsInBasket, GoodForBasket } from "../interfaces";
import { TopHeader } from "../widgets/top-header";
import { SearchBar } from "../components/search-bar";
import { BrandButtons } from "../widgets/brand-buttons";

const Home: NextPage<MainPage> = ({ goods, brands }: MainPage) => {
  const router: any = useRouter();
  const [goodsList, setGoodsList] = useState<GoodForBasket[]>([...goods]);
  const [currentBrand, setCurrentBrand] = useState("Все");
  const [searchbar, setSearchbar] = useState("");

  const searchHandler = (text: string) => {
    setSearchbar(text);
  };

  const handleCurrentBrandHandler: any = (brand: string) => {
    setCurrentBrand(brand);
  };

  const goToGood: any = (id: number) => {
    router.push("/goods/" + id);
  };

  axios.get("http://localhost:8000/api/").then((result) => console.log(result));

  useEffect(() => {
    if (currentBrand !== "Все") {
      const filteredGoods = goods.filter((good) => good.brand === currentBrand);
      const uniqeGoods = Array.from(
        new Map(filteredGoods.map((good) => [good["title"], good]))
      ).map((array) => array[1]);
      const searchedUniqeGoods = uniqeGoods.filter((good) =>
        new RegExp(searchbar.toLowerCase()).test(good.title.toLowerCase())
      );
      setGoodsList(searchedUniqeGoods);
    } else {
      const uniqeGoods = Array.from(
        new Map(goods.map((good) => [good["title"], good]))
      ).map((array) => array[1]);
      const searchedUniqeGoods = uniqeGoods.filter((good) =>
        new RegExp(searchbar.toLowerCase()).test(good.title.toLowerCase())
      );
      setGoodsList(searchedUniqeGoods);
    }
  }, [currentBrand, goods, searchbar]);

  return (
    <div className="container">
      <TopHeader isBack={false}></TopHeader>

      <Typography variant="h6" gutterBottom>
        Каталог товаров
      </Typography>

      <SearchBar searchHandler={searchHandler}></SearchBar>

      <div className="mt-2 pt-2"></div>

      <BrandButtons
        brands={brands}
        handleCurrentBrand={handleCurrentBrandHandler}
      ></BrandButtons>

      <div className="d-flex flex-wrap justify-content-between mt-3">
        {goodsList.map((good: Good) => (
          <CatalogItem
            id={good.id}
            key={good.id}
            title={good.title}
            className="col-6"
            brand={good.brand}
            img={good.imgs[0]}
            imgs={good.imgs}
            category={good.category}
            minPrice={good.sizes
              .map((size) => size.discount_price)
              .reduce((a, b) => Math.min(a, b))}
            sizes={good.sizes}
            color={good.color}
            colors={good.colors}
            description={good.description}
            amount={good.amount}
            handleGoodClick={goToGood}
          />
        ))}
      </div>
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const data: any = require("./../data/goods.json");
  const goods: GoodsInBasket = data.goods;
  const brands: string[] = data.brands;
  return { props: { goods, brands } };
};

export default Home;
