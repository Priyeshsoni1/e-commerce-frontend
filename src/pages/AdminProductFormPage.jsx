import NavBar from "../features/navbar/navbar";
import { ProductForm } from "../features/admin/components/ProductForm";

const AdminProductFormPage = () => {
  return (
    <div>
      <NavBar>
        <ProductForm />
      </NavBar>
    </div>
  );
};
export default AdminProductFormPage;
