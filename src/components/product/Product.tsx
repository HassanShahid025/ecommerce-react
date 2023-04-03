import React, { useEffect } from "react";
import style from "./product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import { ProductList } from "./productList/ProductList";
import { useDispatch } from "react-redux";
import useFetchCollection from "../../customHooks/useFetchCollection";
import { Store_Products } from "../../redux/features/productSlice";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import spinnerImg from "../../assets/spinner.jpg";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(Store_Products({ products: data }));
  }, [dispatch, data]);

  const { products } = useSelector((store: RootState) => store.product);

  return (
    <section>
      <div className={`container ${style.product}`}>
        <aside className={style.filter}>
          {isLoading ? null : <ProductFilter />}
        </aside>
        <div className={style.content}>
          {isLoading ? (
            <img
              src={spinnerImg}
              alt="Loading.."
              style={{ width: "50px" }}
              className="--center-all"
            />
          ) : (
            <ProductList products={products} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Product;
