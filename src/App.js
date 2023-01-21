import React, { useEffect, useState } from "react";
import AddTodoForm from "./components/addTodoForm";
import SingleTodo from "./components/singleTodo";
import ErrorModel from "./components/ErrorModel";
import Done from "./img/done.gif";

import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [updateTodo, setUpdateTodo] = useState(false);
  const [imgShow, setImgShow] = useState(false);
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
      <AddTodoForm
        updateTodo={updateTodo}
        setUpdateTodo={setUpdateTodo}
        imgShow={imgShow}
        setImgShow={setImgShow}
      />
      {imgShow === false ? (
        <div className="d-flex justify-content-center align-items-center">
          <img src={Done} alt="Here Come`s a Done IMG" />
        </div>
      ) : (
        todos.map((todo) => (
          <SingleTodo
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            setUpdateTodo={setUpdateTodo}
            imgShow={imgShow}
            setImgShow={setImgShow}
          />
        ))
      )}
    </div>
  );
}

export default App;
