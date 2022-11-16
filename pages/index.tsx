import type { NextPage, GetStaticProps, GetServerSideProps } from "next";
import CatalogItem from "../widgets/catalog-item";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Good,
  MainPage,
  GoodsInBasket,
  GoodForBasket,
  BrandRes,
} from "../interfaces";
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
            img={good.images[0]}
            images={good.images}
            minPrice={good.sizes
              .map((size) => size.discount_price)
              .reduce((a, b) => Math.min(a, b))}
            sizes={good.sizes}
            color={good.color}
            description={good.description}
            handleGoodClick={goToGood}
          />
        ))}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await axios.get("https://api.thepara.shop/goods/goods/");
  const brandsRes = await axios.get("https://api.thepara.shop/goods/brands/");

  const goods = res.data;
  const brands = brandsRes.data.map((brand: BrandRes) => brand.title);

  return { props: { goods, brands } };
};

export default Home;
