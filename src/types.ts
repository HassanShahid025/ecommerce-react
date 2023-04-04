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
}

export interface IProduct {
  products: IProducts[];
  minPrice: null | number;
  maxPrice: null | number;
}

export interface IFilter {
  filteredProducts: IProducts[];
}
