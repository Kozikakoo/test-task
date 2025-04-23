import { ICard } from "../types/types";

export const searchCards = (cards: ICard[], query: string) => {
  const lowerQuery = query.toLowerCase().trim();

  return cards.filter((card) => card.name.toLowerCase().includes(lowerQuery));
};
