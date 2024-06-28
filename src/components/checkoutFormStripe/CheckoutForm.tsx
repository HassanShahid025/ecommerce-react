// import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
// import { useState } from "react";
// import "./CheckoutForm.css";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";

// import { useNavigate } from "react-router-dom";

// import { Timestamp, addDoc, collection } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import { clear_cart } from "../../redux/features/cartSlice";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";

// const CheckoutForm = () => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [clientSecret, setClientSecret] = useState("");

//   const {email,userId} = useSelector((store:RootState) => store.auth)
//   const {cartItems,cartTotalAmount} = useSelector((store:RootState) => store.cart)
//   const {shippingAddress} = useSelector((store:RootState) => store.checkout)


//   const navigate = useNavigate();
//   const dispatch = useDispatch()


//   const handlePaymentCompleted = () => {
//     const today = new Date();
//     const date = today.toDateString();
//     const time = today.toLocaleTimeString();
//     const orderConfig = {
//       userId,
//       email,
//       orderDate:date,
//       orderTime:time,
//       orderAmount: cartTotalAmount,
//       orderStatus:"Order Placed...",
//       cartItems,
//       shippingAddress,
//       createdAt:Timestamp.now().toDate()
//     };

//     try {
//       addDoc(collection(db, "orders"), orderConfig);
//       dispatch(clear_cart())
//       toast.success("You order has been placed successfully")
//       navigate("/checkout-success");
//     } catch (error: any) {
//       toast.error(error.message);
//     }
//   };

//   const handleSubmitt = async (e) => {
//     e.preventDefault();

//     if (!stripe || !elements) {
//       // Stripe.js has not yet loaded.
//       // Make sure to disable form submission until Stripe.js has loaded.
//       return;
//     }

//     setIsLoading(true);

//     const { error } = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Make sure to change this to your payment completion page
//         return_url: `${window.location.origin}/completion`,
//       },
//     });

//     // This point will only be reached if there is an immediate error when
//     // confirming the payment. Otherwise, your customer will be redirected to
//     // your `return_url`. For some payment methods like iDEAL, your customer will
//     // be redirected to an intermediate site first to authorize the payment, then
//     // redirected to the `return_url`.
//     if (error.type === "card_error" || error.type === "validation_error") {
//       setMessage(error.message);
//     } else {
//       setMessage("An unexpected error occured.");
//     }

//     setIsLoading(false);
//   }
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setProcessing(true);

//     const createPaymentIntent = async () => {
//       const response = await fetch(
//         "https://api.stripe.com/v1/payment_intents",
//         {
//           method: "POST",
//           headers: {
//             // TODO: Replace below <Your Secret/Private Key> with the Secret Key you got from your stripe account
//             Authorization: `Bearer <hassan's secret key>`,
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//           body: new URLSearchParams({
//             amount: (cartTotalAmount*100).toString() , // Amount in cents
//             currency: "usd",
//           }),
//         }
//       );
//       const data = await response.json();
//       return data.client_secret;
//     };

//     const clientSecret = await createPaymentIntent();
//     setClientSecret(clientSecret);

//     const result = await stripe?.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: elements?.getElement(CardElement),
//       },
//     });

//     if (result?.error) {
//       setError(result?.error?.message ?? "");
//       setProcessing(false);
//     } else {
//       if (result?.paymentIntent.status === "succeeded") {
//         handlePaymentCompleted()
//         console.log("Payment succeeded!");
//       }
//       setProcessing(false);
//     }
//   };

//   const cardElementOptions = {
//     style: {
//       base: {
//         color: "#32325d",
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSmoothing: "antialiased",
//         fontSize: "16px",
//         "::placeholder": {
//           color: "#aab7c4",
//         },
//       },
//       invalid: {
//         color: "#fa755a",
//         iconColor: "#fa755a",
//       },
//     },
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement options={cardElementOptions} />
//       <button disabled={!stripe || processing}>Pay Now</button>
//       {error && <div>{error}</div>}
//     </form>
//   );
// };

// export default CheckoutForm;

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  PaymentElement,
} from '@stripe/react-stripe-js'
import { useState } from "react";
import "./CheckoutForm.css";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

import { useNavigate } from "react-router-dom";

import { Timestamp, addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import { clear_cart } from "../../redux/features/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const CheckoutForm = (props) => {
  const {clientSecret} = props
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

  const handleSubmit = async (e) => {
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
        card: elements?.getElement(CardElement),
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
    <form onSubmit={handleSubmit}>
      {/* <PaymentElement id="payment-element" /> */}

      <CardElement  options={cardElementOptions} />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
        </span>
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default CheckoutForm;