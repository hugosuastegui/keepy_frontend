import React from "react";
import { Button } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

function ConceptTable({ concepts, deleteAction }) {
  return (
    <table className="concept">
      <tr>
        <th>Subaccount</th>
        <th>Day</th>
        <th>Month</th>
        <th>Year</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Balance</th>
      </tr>
      {concepts.map((concept, ind) => (
        <tr key={ind}>
          <td>{concept.subaccount}</td>
          <td>{concept.day}</td>
          <td>{concept.month}</td>
          <td>{concept.year}</td>
          <td>{concept.description}</td>
          <td>{concept.amount}</td>
          <td>Balance</td>
          <td>
            <Button
              onClick={() => deleteAction(concept)}
              type="danger"
              size="small"
            >
              <DeleteOutlined />
            </Button>
          </td>
        </tr>
      ))}
    </table>
  );
}

export default ConceptTable;
