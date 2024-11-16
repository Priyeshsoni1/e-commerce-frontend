import React from "react";
import NavBar from "../features/navbar/Navbar";
import { ProductDetails } from "../features/product/components/productDetails";

export const ProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <ProductDetails />
      </NavBar>
    </div>
  );
};
