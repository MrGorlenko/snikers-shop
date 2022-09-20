import { GoodForBasket, CharacteristicsObject } from "../interfaces";

export const addToBasketFromCatalogHandler = (
  id: number,
  goods: GoodForBasket[]
) => {
  const newGoodObject = goods.find((good: GoodForBasket) => good.id == id);

  if (!newGoodObject) return;

  const newGood: GoodForBasket = newGoodObject;
  newGood.characteristics = newGoodObject.characteristics.map(
    (char: CharacteristicsObject) => {
      return { id: char.id, title: char.title, values: char.values[0] };
    }
  );

  return newGood;
};
