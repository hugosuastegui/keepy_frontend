import React from "react";
import { Formik, Form, Field } from "formik";
import DatePicker from "react-datepicker";
import SelectSearch from "react-select-search";

function conceptForm({ subaccountItems }) {
  return (
    <div>
      <SelectSearch
        options={[
          {
            name: "Food",
            type: "group",
            items: [
              {
                value: "hamburger",
                name: "Hamburger",
              },
              {
                value: "pizza",
                name: "Pizza",
              },
            ],
          },
          {
            name: "Drinks",
            type: "group",
            items: [
              {
                value: "soft",
                name: "Soft drink",
              },
              {
                value: "beer",
                name: "Beer",
              },
            ],
          },
        ]}
      />
      <Formik
        initialValues={{ date: new Date() }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          //   addConcept();
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field
              component="select"
              name="subaccount"
              className="primarySelect"
            ></Field>
            <Field name="date">{/* <DatePicker /> */}</Field>
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
  );
}

export default conceptForm;
