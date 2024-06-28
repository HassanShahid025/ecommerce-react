import CheckoutForm from "../../components/checkoutFrom/CheckoutForm";

const Checkout = (props) => {
  const { stripePromise } = props;
  return (
    <>
      <CheckoutForm stripePromise={stripePromise} />
    </>
  );
};

export default Checkout;
