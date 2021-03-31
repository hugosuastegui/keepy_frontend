import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signup, login } from "../services/auth";
import { Redirect } from "react-router-dom";
import { Context } from "../context";

function Landing({ history }) {
  const [message, setMessage] = useState(null);
  const [signupButton, setSignupButton] = useState(true);
  const { user, loginUser } = useContext(Context);

  return !user ? (
    <div className="landingPage">
      <div className="landingHeading">
        <div className="logo">Logo</div>
        <div className="landingHeadingMain">Keep it simple</div>
        <div className="landingHeadingSec">
          Keepy helps you manage your business seamlessly!
        </div>
        <button className="primaryButton">Try ir now for free!</button>
      </div>
      <div className="landingPanel">
        <div className="landingPanelButtons">
          <button className="secButton" onClick={() => setSignupButton(true)}>
            Sign Up
          </button>
          <button className="secButton" onClick={() => setSignupButton(false)}>
            Log In
          </button>
        </div>
        {signupButton ? (
          <div className="signupPanel">
            <h4>Sign Up</h4>
            <Formik
              initialValues={{ email: "", password: "", repeatedPassword: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                // Invalid Password
                if (
                  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(
                    values.password
                  )
                ) {
                  errors.password =
                    "Passwords should have at least eight characters, at least one letter and one number:";
                }
                // Repeated password doesn't match password
                if (values.password !== values.repeatedPassword) {
                  errors.repeatedPassword = `Passwords don't match, please try again`;
                }
                return errors;
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const response = await signup(values);
                if (response.message !== "success") {
                  setMessage(response.message);
                  setSubmitting(false);
                } else {
                  const user = await login(values);
                  delete user.password;
                  loginUser(user);
                  history.push("/projects");
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="signupForm">
                  <label htmlFor="username">Username</label>
                  <Field type="username" name="username" />
                  {message && <div className="message">{message}</div>}
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="message"
                  />
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="message"
                  />
                  <label htmlFor="repeatedPassword">Repeated Password</label>
                  <Field type="password" name="repeatedPassword" />
                  <ErrorMessage
                    name="repeatedPassword"
                    component="div"
                    className="message"
                  />
                  <br />
                  <button
                    className="primaryButton"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <div className="loginPanel">
            <h4>Log In</h4>
            <Formik
              initialValues={{ email: "", password: "", repeatedPassword: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                // Invalid Password
                if (
                  !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(
                    values.password
                  )
                ) {
                  errors.password =
                    "Passwords should have at least eight characters, at least one letter and one number:";
                }
              }}
              onSubmit={async (values, { setSubmitting }) => {
                const response = await login(values);
                console.log("-------- RESPONSE --------");
                console.log(response);
                if (response.message) {
                  console.log("message defined");
                  setMessage(response.message);
                  setSubmitting(false);
                } else {
                  setSubmitting(false);
                  delete response.password;
                  loginUser(response);
                  history.push("/projects");
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="signupForm">
                  <label htmlFor="email">Email</label>
                  <Field type="email" name="email" />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="message"
                  />
                  <label htmlFor="password">Password</label>
                  <Field type="password" name="password" />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="message"
                  />
                  <br />
                  <button
                    className="primaryButton"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        )}
      </div>
    </div>
  ) : (
    <Redirect to="/projects"></Redirect>
  );
}

export default Landing;
