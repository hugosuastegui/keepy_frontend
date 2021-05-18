import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Select from "react-select";
import "react-datepicker/dist/react-datepicker.css";

function ConceptForm({ subaccountItems }) {
  const [date, setDate] = useState(new Date());

  const options = [
    {
      label: "Group 1",
      options: [
        { label: "Group 1, option 1", value: "value_1" },
        { label: "Group 1, option 2", value: "value_2" },
      ],
    },
    { label: "A root option", value: "value_3" },
    { label: "Another root option", value: "value_4" },
  ];

  return (
    <div>
      <Select options={options} />
      <DatePicker selected={date} onChange={(date) => setDate(date)} />
    </div>
  );
}

export default ConceptForm;
