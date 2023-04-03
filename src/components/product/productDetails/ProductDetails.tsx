import { useEffect, useState } from "react";
import style from "./ProductDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { IProducts } from "../../../types";
import { toast } from "react-toastify";
import spinnerImg from "../../../assets/spinner.jpg";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<IProducts | null>(null);

  const getProduct = async () => {
    const docRef = doc(db, "products", id!);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const obj = {
        id: id,
        ...docSnap.data(),
      };
      setProduct(obj);
    } else {
      toast.error("Product not found.");
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <section>
      <div className={`container ${style.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back to Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading.." style={{width:"50px"}}/>
        ) : (
          <>
            <div className={style.details}>
              <div className={style.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={style.content}>
                <h3>{product.name}</h3>
                <p className={style.price}>{`$${product.price}`}</p>
                <p>{product.desc}</p>
                <p>
                  <b>SKU</b> {product.id}
                </p>
                <p>
                  <b>Brand</b> {product.brand}
                </p>
                <div className={style.count}>
                  <button className="--btn">-</button>
                  <p>
                    <b>1</b>
                  </p>
                  <button className="--btn">+</button>
                </div>
                <button className="--btn --btn-danger">ADD TO CART</button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
