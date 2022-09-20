import { CharacteristicsObject, GoodForBasket } from "../interfaces";

export const addToBasketHandler = (
  goods: GoodForBasket[],
  good: GoodForBasket
): GoodForBasket[] => {
  const number = goods
    .map((elem: GoodForBasket, index: number) => {
      return elem.characteristics.map(
        (char: CharacteristicsObject, jindex: number) => {
          if (char.values === good.characteristics[jindex].values) return index;
          else return "000";
        }
      );
    })
    .map((e) => e.every((val: number | string) => val !== "000"))
    .indexOf(true);

  const conditionID: boolean = goods
    .map((elem: GoodForBasket) => elem.id === good.id)
    .includes(true);

  const condition: boolean = goods
    .map((elem: GoodForBasket) => {
      return elem.characteristics
        .map((characteristics: CharacteristicsObject, index: number) => {
          return characteristics.values === good.characteristics[index].values;
        })
        .every((elem: boolean) => elem === true);
    })
    .includes(true);

  if (condition && conditionID) {
    goods = [
      ...goods.slice(0, number),
      { ...good, amount_in_basket: goods[number].amount_in_basket + 1 },
      ...goods.slice(number + 1, goods.length),
    ];
  } else {
    goods = [...goods, { ...good, amount_in_basket: 1 }];
  }

  return [...goods];
};
