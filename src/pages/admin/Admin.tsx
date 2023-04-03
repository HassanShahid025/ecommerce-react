import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/admin/navbar/Navbar";
import "./admin.scss";
import Home from "../../components/admin/home/Home";
import ViewProducts from "../../components/admin/viewProducts/ViewProducts";
import Orders from "../../components/admin/orders/Orders";
import AddProduct from "../../components/admin/addProduct/AddProduct";

const Admin = () => {
  return (
    <div className="admin">
      <div className="navbarr">
        <Navbar />
      </div>
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/all-products" element={<ViewProducts />} />
          <Route path="/add-product/:id" element={<AddProduct />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
