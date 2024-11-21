import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUser } from "./authSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUser);
  console.log("ProtedUser", user);
  if (!user) return <Navigate to="/login" />;
  console.log("ProtedUser", user);
  return children;
};
export default Protected;
