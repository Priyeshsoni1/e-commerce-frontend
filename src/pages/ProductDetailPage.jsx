import React from "react";
import NavBar from "../features/navbar/Navbar";
import ProductDetails from "../features/product/components/ProductDetails";

const ProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <ProductDetails />
      </NavBar>
    </div>
  );
};
export default ProductDetailPage;
