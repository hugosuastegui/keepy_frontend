import React from "react";
import { DeleteOutlined } from "@ant-design/icons";

function ConceptTable({ concepts, deleteAction }) {
  const accum = subtotal(concepts, "amount");
  const balancedConcepts = concepts.map((el, ind) => ({
    ...el,
    balance: accum[ind],
  }));

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 1,
  });

  return (
    <table>
      <thead>
        <tr>
          <th className="sticky">Subaccount</th>
          <th>Day</th>
          <th>Month</th>
          <th>Year</th>
          <th>Description</th>
          <th>Amount</th>
          <th>Balance</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {balancedConcepts.reverse().map((concept, ind) => (
          <tr key={ind}>
            <td className="headcol sticky">{concept.subaccount.name}</td>
            <td>{concept.day}</td>
            <td>{concept.month}</td>
            <td>{concept.year}</td>
            <td>{concept.description}</td>
            <td>{formatter.format(concept.amount)}</td>
            <td>{formatter.format(concept.balance)}</td>
            <td>
              <button onClick={() => deleteAction(concept)}>
                <DeleteOutlined />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function subtotal(array, attr) {
  let newArray = [];
  array.forEach((curr, ind) => {
    if (ind === 0) {
      newArray.push(curr[attr]);
    } else {
      let accum = curr[attr] + newArray[ind - 1];
      newArray.push(accum);
    }
  });
  return newArray;
}

export default ConceptTable;
