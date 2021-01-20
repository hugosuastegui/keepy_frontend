import React, { useContext, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";
import MY_SERVICES from "../services/index";

const { updateUser } = MY_SERVICES;

function Profile() {
  const { user } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const inputName = useRef(null);

  const toggleEdit = () => {
    setEditMode(!editMode);
    console.log("On Edit Mode");
  };

  const editUser = async () => {
    console.log(`User updated, value: ${inputName.current.value}`);
    setEditMode(!editMode);
    user.username = inputName.current.value;
    await updateUser(user._id, user);
  };

  return user ? (
    <div>
      {!editMode ? (
        <h1 style={{ display: "inline" }}>Welcome {user.username}</h1>
      ) : (
        <input
          ref={inputName}
          defaultValue={user.username}
          // onBlur={(e) => editUser(e.target.value)}
        ></input>
      )}
      {editMode ? (
        <button onClick={() => editUser()} style={{ margin: "5px" }}>
          <CheckOutlined />
        </button>
      ) : (
        <button onClick={() => toggleEdit()} style={{ margin: "5px" }}>
          <EditOutlined />
        </button>
      )}
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
