export interface IProducts {
  brand?: string;
  category?: string;
  id?: string;
  imageURL?: string;
  name?: string;
  price?: number;
  desc?:string
  createdAt?:any,
  editedAt?:any
}

export interface IProduct{
  products:IProducts[]
}

export interface IFilter {
  category: string[];
  brand: string[];
  products: IProducts[];
  originalProducts:IProducts[]
  originalCategory: string[];
  originalBrand: string[];
}
