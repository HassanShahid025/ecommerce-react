import CheckoutForm from "../../components/checkoutFrom/CheckoutForm";

const Checkout = ({stripePromise}:{stripePromise: any}) => {
  return (
    <>
      <CheckoutForm stripePromise={stripePromise}/>
    </>
  );
};

export default Checkout;
