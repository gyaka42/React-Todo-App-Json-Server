import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/addTodoForm";
import SingleTodo from "./components/singleTodo";

import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3004/todos")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => {
        alert("An error occurd while getting data");
      });
  }, [updateTodo]);
  return (
    <div className="container p-5">
      <h1 className="fs-1 fw-bold p-3 text-primary text-center">
        Todo List App
      </h1>
      <AddTodoForm updateTodo={updateTodo} setUpdateTodo={setUpdateTodo} />
      {todos.map((todo) => (
        <SingleTodo key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default App;
