import React from "react";
import NavBar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";
import Footer from "../features/common/Footer";

const ProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <ProductDetails />
      </NavBar>{" "}
      <Footer />
    </div>
  );
};
export default ProductDetailPage;
