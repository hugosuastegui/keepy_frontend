import React from "react";

function SubaccountTable({ cataloguedItems }) {
  return (
    <div className="subaccountTable">
      <table>
        <tbody>
          {cataloguedItems.map((account) => (
            <>
              <tr>
                <th className="account-row">{account.label}</th>
              </tr>
              {account.options.map((subaccount) => (
                <tr>
                  <td className="subaccount-row">{subaccount.label}</td>
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SubaccountTable;
