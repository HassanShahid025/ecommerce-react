export interface IProducts {
  brand?: string;
  category?: string;
  id?: string;
  imageURL?: string;
  name?: string;
  price?: number;
  desc?: string;
  createdAt?: any;
  editedAt?: any;
  cartQuantiy?: number;
}

export interface IProduct {
  products: IProducts[];
  minPrice: null | number;
  maxPrice: null | number;
}

export interface IFilter {
  filteredProducts: IProducts[];
}

export interface ICart {
  cartItems: IProducts[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  previousUrl: string
}

export type ICard = {
  name: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
  country: string;
  zip: string;
};
