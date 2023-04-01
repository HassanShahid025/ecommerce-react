import React, { Children, useEffect, useState } from "react";
import "./card.scss";
import testImg from "../../assets/login.png";
import { onSnapshot } from "firebase/firestore";
import { productsCollection } from "../../firebase/controller";
import { IProducts } from "../../types";
// import { initilizeProducts } from "../../redux/features/productsSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";
import { initilizeProducts } from "../../redux/features/filterSlice";

export const Card = () => {
  const [firebaseProducts, setFirebaseProducts] = useState<IProducts[]>([]);
  const { products } = useSelector((store: RootState) => store.filter);

  useEffect(
    () =>
      onSnapshot(productsCollection, (snapshot) => {
        setFirebaseProducts(
          snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          })
        );
      }),
    []
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initilizeProducts(firebaseProducts));
  }, [firebaseProducts]);

  if (products.length === 0) {
    return <h1>No Product Found</h1>;
  }

  return (
    <>
      <div className="cards-container">
        {products.map((product) => {
          const { id, name, brand, category, img, price } = product;
          return (
            <div className="product-card" key={id}>
              <div className="product-image">
                <img src={img} alt="image" />
              </div>
              <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="product-price">${price}</div>
                <button className="add-to-cart">Add to cart</button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
