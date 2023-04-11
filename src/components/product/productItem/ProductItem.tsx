import React, { useEffect, useState } from "react";
import style from "./ProductItem.module.scss";
import { IProducts } from "../../../types";
import { Card } from "../../card/Card";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { add_to_cart, calculate_CartTotalQuantity } from "../../../redux/features/cartSlice";

interface IProductItem {
  product: IProducts;
  grid: boolean;
}

const ProductItem = ({ product, grid }: IProductItem) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { id, name, price, desc, imageURL } = product;

  const shortingText = (text:string, n:number) => {
    if(text.length > n){
      const shortenedText = text.substring(0,n).concat("...")
      return shortenedText
    }
    return text
  }

  const dispatch = useDispatch()

  const addToCart = (product:IProducts) => {
    dispatch(add_to_cart({product}))
    dispatch(calculate_CartTotalQuantity())
  }
  
  useEffect(() => {
    setWindowWidth(windowWidth)
  },[grid])

  return(
    <Card cardClass={grid ? `${style.grid}` : `${style.list}`}>
      <Link to={`/product-details/${id}`}>
      <div className={style.img}>
        <img src={imageURL} alt={name}/>
      </div>
      </Link>
      <div className={style.content}>
        <div className={style.details}>
          <p>{`$${price}`}</p>
          <h4>{shortingText(name!,18)}</h4>
        </div>
        {!grid && <p className={style.desc}>{windowWidth > 500 ? shortingText(desc!,200) : shortingText(desc!,50)}</p>}
        <button className="--btn --btn-danger" onClick={() => addToCart(product)}>Add To Cart</button>
      </div>
    </Card>
  )
};

export default ProductItem;
