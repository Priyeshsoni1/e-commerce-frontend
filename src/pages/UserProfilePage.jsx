import React from "react";
import UserProfile from "../features/user/components/UserProfile";
import NavBar from "../features/navbar/Navbar";

export const UserProfilePage = () => {
  return (
    <div>
      {" "}
      <NavBar>
        <h1 className="mx-auto text-2xl text-black font-bold">My Profile</h1>

        <UserProfile />
      </NavBar>
    </div>
  );
};