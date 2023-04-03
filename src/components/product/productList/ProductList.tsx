import React, { useState } from "react";
import style from "./ProductList.module.scss";
import { IProducts } from "../../../types";
import { BsFillGridFill } from "react-icons/bs";
import { FaListAlt } from "react-icons/fa";
import Search from '../../search/Search'
import ProductItem from "../productItem/ProductItem";

interface IProductList {
  products: IProducts[];
}

export const ProductList = ({ products }: IProductList) => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("")

  return (
    <div className={style["product-list"]} id="product">
      <div className={style.top}>
        <div className={style.icons}>
          <BsFillGridFill
            size={22}
            color="orangered"
            onClick={() => setGrid(true)}
          />
          <FaListAlt size={24} color="#0066d4" onClick={() => setGrid(false)} />
          <p>
            <b>{products.length}</b>{" "}
            {products.length > 1 ? "Products found." : "Product found."}
          </p>
        </div>
        {/* {Search Icon} */}
        <div>
          <Search value={search} onChange={(e:any) => setSearch(e.target.value)}/>
        </div>
        {/* {Sort Product} */}
        <div className={style.sort}>
          <label>Sort by:</label>
          <select>
            <option value="latest">Latest</option>
            <option value="lowest-price">Lowest Price</option>
            <option value="highest-price">Highest Price</option>
            <option value="a-z">A - Z</option>
            <option value="z-a">Z - A</option>
          </select>
        </div>
      </div>
      <div className={grid ? `${style.grid}` : `${style.list}`}>
        {products.length === 0 ? (
          <p>No product found.</p>
        ) : (
          <>
            {products.map((product) => {
            return(
              <div key={product.id}>
                <ProductItem product={product} grid={grid}/>
              </div>
            )
          })}
          </>
        )}
      </div>
    </div>
  );
};
