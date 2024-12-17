import React, { useEffect, useState } from "react";
import { Button, FormControl, InputLabel, Input } from "@mui/material";
import "./App.css";
// @ts-ignore
import Todo from "./Todo";
import db from "./firebase.js";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [value, setValue] = useState(dayjs());
  console.log(value);

  useEffect(() => {
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        //console.log(snapshot.docs.map((doc) => doc.data().todo));

        setTodos(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            todo: doc.data().todo,
            check: doc.data().check,
            deadline: doc.data().deadline,
          }))
        );
      });
  }, []);

  const addTodo = (event) => {
    event.preventDefault();

    db.collection("todos").add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      check: false,
      deadline:
        "Deadline: " +
        value.$d.toLocaleDateString() +
        " " +
        value.$d.toLocaleTimeString(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <h1>Taskly</h1>
      <form>
        <FormControl>
          <InputLabel>Write a Task</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DateTimePicker", "DateTimePicker"]}>
              <DateTimePicker
                label="Deadline"
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </FormControl>

        <Button
          disabled={!input} // Disables the button if there is no input
          variant="contained"
          type="submit"
          onClick={addTodo}
        >
          Add Task
        </Button>
      </form>
      <ul className="task_name">
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;
