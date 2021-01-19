import React, { useContext, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { EditOutlined, CheckOutlined } from "@ant-design/icons";

function Profile() {
  const { user } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const inputName = useRef(null);
  const toggleEdit = () => {
    setEditMode(!editMode);
    console.log("On Edit Mode");
  };
  const updateUser = () => {
    console.log(`User updated, value: ${inputName.current.value}`);
    setEditMode(!editMode);
  };
  return user ? (
    <div>
      {!editMode ? (
        <h1 style={{ display: "inline" }}>Welcome {user.username}</h1>
      ) : (
        <input
          ref={inputName}
          defaultValue={user.username}
          // onBlur={(e) => updateUser(e.target.value)}
        ></input>
      )}
      {editMode ? (
        <button onClick={() => updateUser()} style={{ margin: "5px" }}>
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
