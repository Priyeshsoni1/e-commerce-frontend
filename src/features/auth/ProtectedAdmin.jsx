import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import { selectLoggedInUser } from "./authSlice";
import { selectUserInfo } from "../user/UserSlice";

const ProtectedAdmin = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  const userInfo = useSelector(selectUserInfo);

  if (!user) return <Navigate to="/login" />;
  if (user && userInfo.role !== "admin") return <Navigate to="/" />;

  return children;
};
export default ProtectedAdmin;
