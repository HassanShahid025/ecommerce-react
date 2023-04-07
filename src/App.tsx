import "./App.css";
import { Routes, Route } from "react-router-dom";
//Components
import { Header, Footer, AdminOnlyRoute } from "./components//export";

//Pages
import { Home, Contact, Login, Register, Reset, Admin, Cart } from "./pages/export";
import ProductDetails from "./components/product/productDetails/ProductDetails";
import CheckoutDetails from "./pages/checkout/CheckoutDetails";
import Checkout from "./pages/checkout/Checkout";
import CheckOutSuccessfull from "./pages/checkout/CheckOutSuccessfull";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/product-details/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart/>} />
        <Route path="/checkout-details" element={<CheckoutDetails/>} />
        <Route path="/checkout" element={<Checkout/>} />
        <Route path="/checkout-success" element={<CheckOutSuccessfull/>} />

        <Route
          path="/admin/*"
          element={
            <AdminOnlyRoute>
              <Admin />
            </AdminOnlyRoute>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
