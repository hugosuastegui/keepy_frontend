import React, { useContext, useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";
import { Card, Form, Input, Button } from "antd";
import {
  EditOutlined,
  CheckOutlined,
  DeleteOutlined,
  SelectOutlined,
} from "@ant-design/icons";
import MY_SERVICES from "../services/index";

const { Meta } = Card;
const { updateUser, createProject } = MY_SERVICES;

function Profile() {
  const { user } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const [projectForm, setProjectForm] = useState(false);
  const [projects, setProjects] = useState(null);
  const [form] = Form.useForm();
  const inputName = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log(user.projects);
    };
    fetchData();
  }, []);

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  const toggleProjectForm = () => {
    setProjectForm(!projectForm);
  };

  const editUser = async () => {
    console.log(`User updated, value: ${inputName.current.value}`);
    setEditMode(!editMode);
    user.username = inputName.current.value;
    await updateUser(user._id, user);
  };

  const onFinishProjectForm = async (values) => {
    console.log(values);
    setProjectForm(!projectForm);
    await createProject(values);
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
      {projectForm ? (
        <Form
          name="projectForm"
          form={form}
          layout="vertical"
          onFinish={onFinishProjectForm}
        >
          <Form.Item
            label="Project's Name"
            name="name"
            rules={[
              { required: true, message: "Please input your project's name" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input your project's description",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <></>
      )}
      <div>
        {projects ? (
          projects.map((project, ind) => (
            <Card
              style={{ width: 300 }}
              key={ind}
              actions={[
                <EditOutlined key="edit" />,
                <DeleteOutlined key="setting" />,
                <SelectOutlined key="select" />,
              ]}
            >
              <Meta title={project.name} description={project.description} />
            </Card>
          ))
        ) : (
          <p>No projects to show yet, start off by creating a new project</p>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/login" />
  );
}

export default Profile;
