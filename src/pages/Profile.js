import React, { useContext, useState, useRef, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { Context } from "../context";

// Components in page
import ProjectCard from "../components/ProjectCard";
import ProjectForm from "../components/ProjectForm";

import { EditOutlined, CheckOutlined } from "@ant-design/icons";

// Services in page

import MY_SERVICES from "../services/index";
import { getCurrentUser } from "../services/auth";
const { updateUser } = MY_SERVICES;

function Profile() {
  const { user } = useContext(Context);
  const [editMode, setEditMode] = useState(false);
  const [projectForm, setProjectForm] = useState(false);
  const [projectsList, setProjectsList] = useState([]);
  const inputName = useRef(null);

  useEffect(() => {
    async function fetchInfo() {
      const {
        data: {
          user: { projects },
        },
      } = await getCurrentUser();
      setProjectsList(projects);
    }
    fetchInfo();
  }, [projectForm]);

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

  return user ? (
    <div>
      {!editMode ? (
        <h1 style={{ display: "inline" }}>Welcome {user.username}</h1>
      ) : (
        <input ref={inputName} defaultValue={user.username}></input>
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
        <ProjectForm toggle={setProjectForm}></ProjectForm>
      ) : (
        <></>
      )}
      <div>
        {projectsList.length !== 0 ? (
          projectsList.map((project, ind) => (
            <ProjectCard key={ind} project={project} index={ind}></ProjectCard>
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
