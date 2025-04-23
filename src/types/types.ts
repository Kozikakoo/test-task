export interface ICard {
  id: number;
  name: string;
  price: number;
  image: string;
}

export type SortType = "alpha-asc" | "alpha-desc" | "price-asc" | "price-desc";

export interface ICartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}
