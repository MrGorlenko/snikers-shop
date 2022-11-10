export interface Styles {
  width?: number;
  height?: number;
  position?: string;
  top?: number;
  left?: number;
  bottom?: number;
  right?: number;
}

export interface Options {
  options: string[] | string;
  value?: string;
  clickHandler(option: string, value?: number | string): any;
  clickMenuHandler(option: string, value?: string | number): any;
  buttonGroupClassName?: string;
  leftButtonStyle?: Styles;
}

export interface CharacteristicsObject {
  id: number;
  title: string;
  values: string[] | string;
}

export interface Size {
  id: number;
  size: string;
  amount: number;
  price: number;
  discount_price: number;
}

export interface Good {
  id: number;
  title: string;
  brand: string;
  description: string;
  images: string[];
  sizes: Size[];
  color: string;
}

export interface GoodForBasket extends Good {
  amount_in_basket: number;
  selected_size: string;
  selected_price: number;
  selected_discount_price: number;
  img?: string;
}

export interface Goods {
  goods: Good[];
}

export interface GoodsInBasket {
  goods: GoodForBasket[];
}

export interface MainPage {
  goods: GoodForBasket[];
  brands: string[];
}

export interface GoodPage {
  good: Good;
  goods: Good[];
}

export interface Basket {
  basket: GoodsInBasket;
}

export interface CounterNumbersWidget {
  children: JSX.Element | number | string;
  classes?: string;
  incrementHandler(): any;
  decrementHandler(): any;
}

export interface HeaderOptions {
  isBack: boolean;
}

export interface BrandRes {
  id: number;
  title: string;
}

export interface Order {
  city: string;
  street: string;
  houseNumber: string;
  apartmentNumber?: string;
  entryNumber?: string;
  intercome?: string;
  floorNumber?: string;
  postIndex: string;
  comment?: string;
  name: string;
  phone: string;
}

export interface OrderInfo {
  order: Order;
}

interface BasketInfo {
  goods: GoodForBasket[];
}

export interface OdrerState {
  order: OrderInfo;
  basket: BasketInfo;
}
