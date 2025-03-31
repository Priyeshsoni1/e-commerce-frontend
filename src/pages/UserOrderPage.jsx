import NavBar from "../features/navbar/navbar";

import UserOrder from "../features/user/components/UserOrder";

const UserOrderPage = () => {
  return (
    <div>
      {" "}
      <NavBar>
        <h1 className="mx-auto text-2xl text-black font-bold">Order History</h1>

        <UserOrder />
      </NavBar>
    </div>
  );
};
export default UserOrderPage;
