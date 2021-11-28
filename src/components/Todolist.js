import React from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

export default function Todotable(props) {
  return (
    <div
      className="ag-theme-material"
      style={{ height: "700px", width: "70%", margin: "auto" }}
    >
      <AgGridReact
        columnDefs={props.columns}
        rowData={props.todos}
      ></AgGridReact>
    </div>
  );
}
