import React, { useState, useContext } from "react";
import { Context } from "../context";
import { Redirect } from "react-router-dom";

function Profile() {
  const { user } = useContext(Context);
  return user ? (
    <div>
      <h2>Welcome {user.email}</h2>
      <p>From this page you can do absolutely nothing right now :)</p>
      <p>
        In the near future you will be able to manage who has the permisson to
        edit the information of the projects you choose to hand on
      </p>
    </div>
  ) : (
    <Redirect to="/"></Redirect>
  );
}

export default Profile;
