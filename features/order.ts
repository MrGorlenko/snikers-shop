import { createSlice } from "@reduxjs/toolkit";
import { Order } from "../interfaces";

const initialState: Order = {
  city: "",
  street: "",
  houseNumber: "",
  apartmentNumber: "",
  entryNumber: "",
  intercome: "",
  floorNumber: "",
  postIndex: "",
  comment: "",
  name: "",
  phone: "",
};

const orderSlice = createSlice({
  name: "order",
  initialState: { order: initialState },
  reducers: {
    setAddressInfo(state, action) {
      state.order.city = action.payload.city;
      state.order.street = action.payload.street;
      state.order.houseNumber = action.payload.houseNumber;
      state.order.apartmentNumber = action.payload.apartmentNumber;
      state.order.entryNumber = action.payload.entryNumber;
      state.order.intercome = action.payload.intercome;
      state.order.floorNumber = action.payload.floorNumber;
      state.order.postIndex = action.payload.postIndex;
      state.order.comment = action.payload.comment;
    },
    setCustomerInfo(state, action) {
      state.order.name = action.payload.name;
      state.order.phone = action.payload.phone;
    },
    setCustomerPhone(state, action) {
      state.order.phone = action.payload;
    },
    setCustomerName(state, action) {
      state.order.name = action.payload;
    },
  },
});

export const {
  setAddressInfo,
  setCustomerInfo,
  setCustomerPhone,
  setCustomerName,
} = orderSlice.actions;

export default orderSlice.reducer;
