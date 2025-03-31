import NavBar from "../features/navbar/navbar";
import Footer from "../features/common/Footer";
import ProductList from "../features/product/components/ProductList";

function Home() {
  return (
    <div>
      <NavBar>
        <ProductList></ProductList>
      </NavBar>
      <Footer />
    </div>
  );
}

export default Home;
