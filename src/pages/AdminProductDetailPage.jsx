import React from "react";
import NavBar from "../features/navbar/Navbar";

import AdminProductDetail from "../features/admin/components/AdminProductDetails";

const AdminProductDetailPage = () => {
  return (
    <div>
      <NavBar>
        <AdminProductDetail />
      </NavBar>
    </div>
  );
};
export default AdminProductDetailPage;
