export interface IProducts {
  brand?: string;
  category?: string;
  id?: string;
  img?: string;
  name?: string;
  price?: string;
}

export interface IFilter {
  category: string[];
  brand: string[];
  products: IProducts[];
  originalProducts:IProducts[]
  originalCategory: string[];
  originalBrand: string[];
}
