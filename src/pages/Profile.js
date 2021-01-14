import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";

function Profile() {
  const { logout, user } = useContext(Context);
  return user ? (
    <div>
      <h1>Welcome {user.email}</h1>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
