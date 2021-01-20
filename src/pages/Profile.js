import React, { useContext, useState, useRef } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { Card } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import MY_SERVICES from "../services/index";

const { Meta } = Card;
const { updateUser } = MY_SERVICES;

function Profile() {
  const { user } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const inputName = useRef(null);

  const toggleEdit = () => {
    setEditMode(!editMode);
    console.log("On Edit Mode");
  };

  const toggleProjectForm = () => {
    console.log("On toggleProjectForm");
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
      <p>Here you can find all the projects you've created.</p>
      <button onClick={() => toggleProjectForm()}>Add a New Project</button>
      <br />
      <br />
      <div>
        <Card
          style={{ width: 300 }}
          // cover={
          //   <img
          //     alt="example"
          //     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          //   />
          // }
          actions={[
            <EditOutlined key="edit" />,
            <DeleteOutlined key="setting" />,
            <SelectOutlined key="select" />,
          ]}
        >
          <Meta title="Project name" description="Project description" />
        </Card>
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
