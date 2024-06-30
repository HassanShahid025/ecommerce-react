import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  PaymentElement,
} from '@stripe/react-stripe-js'
import style from "./checkoutFormStripe.module.scss";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { clear_cart } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const CheckoutFormStripe = ({clientSecret}:{clientSecret:string}) => { 
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);

  const {email,userId} = useSelector((store:RootState) => store.auth)
  const {cartItems,cartTotalAmount} = useSelector((store:RootState) => store.cart)
  const {shippingAddress} = useSelector((store:RootState) => store.checkout)
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const handlePaymentCompleted = () => {
    const today = new Date();
    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      email,
      orderDate:date,
      orderTime:time,
      orderAmount: cartTotalAmount,
      orderStatus:"Order Placed...",
      cartItems,
      shippingAddress,
      createdAt:Timestamp.now().toDate()
    };
    try {
      addDoc(collection(db, "orders"), orderConfig);
      dispatch(clear_cart())
      toast.success("You order has been placed successfully")
      navigate("/checkout-success");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);


    // stripe.confirmPayment({

    //   elements
    // })
    stripe?.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      },
    })
    .then(function(result) {
      if (result?.error) {
        setError(result?.error?.message ?? "");
    } else {
      if (result?.paymentIntent.status === "succeeded") {
        handlePaymentCompleted()
        console.log("Payment succeeded!");
      }
    }
    });

    setIsLoading(false);
  }


  const cardElementOptions = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  return (
    <form onSubmit={handleSubmit} className={style.stripeForm}>
      <CardElement  options={cardElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit" className={style.stripeBtn}>
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};
export default CheckoutFormStripe;