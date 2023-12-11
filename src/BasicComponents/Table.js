import React from "react";

function Table(props) {
  return (
    <div>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        {props.columns.length > 0 ? (
          <thead>
            <tr>
              {props.columns.map((e) => {
                return (
                  <th
                    style={{
                      textAlign: "center",
                      padding: "0.75rem 0",
                      backgroundColor: "rgb(248, 249, 250)",
                    }}
                    className="s11"
                  >
                    {e}
                  </th>
                );
              })}
            </tr>
          </thead>
        ) : null}
        <tbody>
          {props.dataTable.map((e, i) => {
            return (
              <tr
                key={i}
                style={{
                  borderTop: "1px solid rgb(222, 226, 230)",
                  borderBottom: "1px solid rgb(222, 226, 230)",
                }}
              >
                {props.columnsKey.map((ele) => {
                  return (
                    <td
                      style={{
                        textAlign: "center",
                        padding: "0.75rem 0",
                        color: "#6c757d",
                      }}
                      className="s11"
                    >
                      {e[ele] ? e[ele] : "--"}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
