import React, { useState, useRef } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import { TextField, Button, Box } from "@material-ui/core/";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DesktopDatePicker from "@mui/lab/DesktopDatePicker";
import { getDate, getMonth, getYear } from "date-fns";
import { Tabs, Tab } from "@mui/material";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        p: 1,
        m: 1,
        ...sx,
      }}
      {...other}
    />
  );
}

function App() {
  const [todo, setTodo] = useState({ kuvaus: "", pvm: "", tarkeys: "" });
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState(new Date());
  const [menuValue, setMenuValue] = useState("one");

  const gridRef = useRef();

  const columns = [
    {
      flex: 1,
      headerName: "Description",
      field: "kuvaus",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      flex: 1,
      headerName: "Date",
      field: "pvm",
      sortable: true,
      filter: true,
      floatingFilter: true,
    },
    {
      flex: 1,
      headerName: "Priority",
      field: "tarkeys",
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === "High" ? { color: "red" } : { color: "black" },
    },
  ];

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const handleChange = (newValue) => {
    setValue(newValue);
    setTodo({
      ...todo,
      pvm:
        getDate(newValue) +
        "-" +
        (getMonth(newValue) + 1) +
        "-" +
        getYear(newValue),
    });
  };

  const menuChange = (event, value) => {
    setMenuValue(value);
  };

  const addTodo = (event) => {
    event.preventDefault();
    console.log(todo);
    setTodos([...todos, todo]);
  };

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(
        todos.filter(
          (todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex
        )
      );
    } else {
      alert("Select row first");
    }
  };

  return (
    <div className="App">
      <h1 className="App-header">TODOLIST</h1>
      <Tabs
        style={{ size: "small", paddingBottom: 15 }}
        value={menuValue}
        onChange={menuChange}
      >
        <Tab value="one" label="Home"></Tab>
        <Tab value="two" label="Todolist"></Tab>
      </Tabs>
      {menuValue === "one" && (
        <div>
          <h1>Welcome to TODOLIST!</h1>
        </div>
      )}
      {menuValue === "two" && (
        <div>
          <div className="App-input">
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-end",
                p: 1,
                m: 1,
              }}
            >
              <Item>
                <TextField
                  type="text"
                  placeholder="Task"
                  value={todo.kuvaus}
                  name="kuvaus"
                  onChange={inputChanged}
                />
              </Item>
              <Item>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                    label="Date desktop"
                    inputFormat="dd/MM/yyyy"
                    value={value}
                    onChange={handleChange}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Item>
              <Item>
                <TextField
                  type="text"
                  placeholder="Priority"
                  value={todo.tarkeys}
                  name="tarkeys"
                  onChange={inputChanged}
                />
              </Item>
              <Item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={addTodo}
                >
                  Add
                </Button>
              </Item>
              <Item>
                <Button
                  size="small"
                  variant="contained"
                  color="primary"
                  onClick={deleteTodo}
                >
                  Delete
                </Button>
              </Item>
            </Box>
          </div>
          <div
            className="ag-theme-material"
            style={{
              height: "700px",
              width: "80%",
              margin: "auto",
            }}
          >
            <AgGridReact
              ref={gridRef}
              onGridReady={(params) => (gridRef.current = params.api)}
              rowSelection="single"
              columnDefs={columns}
              rowData={todos}
              animateRows="true"
            ></AgGridReact>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
