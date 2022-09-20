import { GoodForBasket } from "../interfaces";

import { createSlice } from "@reduxjs/toolkit";
const initialState: GoodForBasket[] = [];

const basketSlice = createSlice({
  name: "basket",
  initialState: { goods: initialState },
  reducers: {
    addToBasket(state, action) {
      state.goods.push(action.payload);
    },
    removeFromBasket(state, action) {
      const goods = state.goods.filter(
        (good, index) => index !== action.payload
      );
      state.goods = [...goods];
    },
    incrementGood(state, action) {
      state.goods[action.payload].amount_in_basket++;
    },
    decrementGood(state, action) {
      state.goods[action.payload].amount_in_basket--;
    },
  },
});

export const { addToBasket } = basketSlice.actions;
export const { removeFromBasket } = basketSlice.actions;
export const { incrementGood } = basketSlice.actions;
export const { decrementGood } = basketSlice.actions;

export default basketSlice.reducer;
