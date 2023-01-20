import React, { useState } from "react";

import axios from "axios";

const AddTodoForm = ({ updateTodo, setUpdateTodo }) => {
  const [todoText, SetTodoText] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /* Validation */
    if (todoText === "") {
      alert("The Todo text entry can`t be empty !");
      return;
    }
    if (todoText.length < 3) {
      alert("The Todo text needs to be at least 3 characters long !");
      return;
    }
    const newTodo = {
      id: String(new Date().getTime()),
      text: todoText,
      date: new Date(),
      isDone: false,
    };
    axios
      .post("http://localhost:3004/todos", newTodo)
      .then((res) => {
        setUpdateTodo(!updateTodo);
        SetTodoText("");
      })
      .catch((error) => {});
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Add your Todo !"
          value={todoText}
          onChange={(event) => SetTodoText(event.target.value)}
        />
        <button className="btn btn-primary" type="submit" id="button-addon2">
          Add
        </button>
      </div>
    </form>
  );
};
export default AddTodoForm;
