import React, { useEffect, useState } from "react";
import style from "./checkoutFrom.module.scss";
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Card } from "../card/Card";
import CheckoutSummary from "../checkoutSummary/CheckoutSummary";
import spinnerImg from "../../assets/spinner.jpg";
import { toast } from "react-toastify";
import CheckoutPayment from "../checkoutPayment/CheckoutPayment";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useDispatch } from "react-redux";

const CheckoutForm = () => {

  const {email,userId} = useSelector((store:RootState) => store.auth)
  const {cartItems,cartTotalAmount} = useSelector((store:RootState) => store.cart)
  const {shippingAddress} = useSelector((store:RootState) => store.checkout)


  const navigate = useNavigate();
  const dispatch = useDispatch()

  const saveOrder = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {};

    try {
      addDoc(collection(db, "orders"), {});
      navigate("/admin/all-products");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <section>
      <h3 className="container">Checkout</h3>
      <div className={`container ${style.checkout}`}>
        <div>
          <Card cardClass={style.card}>
            <CheckoutSummary />
          </Card>
        </div>

        <div>
          <Card cardClass={`${style.card} ${style.pay}`}>
            <CheckoutPayment />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CheckoutForm;
