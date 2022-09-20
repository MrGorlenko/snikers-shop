import { CharacteristicsObject, GoodsGood } from "../interfaces";

export const useChartObjectsList = ({
  good,
}: GoodsGood): CharacteristicsObject[] => {
  return good.characteristics.map((char) => {
    return { id: char.id, title: char.title, values: char.values[0] };
  });
};
