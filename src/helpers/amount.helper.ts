import { ICartItem } from "../store/cart/cartSlice";

export const amountPrices = (items: ICartItem[]) => {
  return items.reduce((acc, item) => acc + item.price * item.quantity, 0);
};
