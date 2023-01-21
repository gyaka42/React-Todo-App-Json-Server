import React, { useState } from "react";
import ErrorModel from "./ErrorModel";

import axios from "axios";

const AddTodoForm = ({ updateTodo, setUpdateTodo, imgShow, setImgShow }) => {
  const [todoText, setTodoText] = useState("");
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    /* Validation */
    if (todoText === "") {
      setHasError(true);
      setErrorMessage("The Todo text entry can`t be empty !");
      return;
    }
    if (todoText.length < 3) {
      setHasError(true);
      setErrorMessage("The Todo text needs to be at least 3 characters long !");
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
        setImgShow(true);
        setUpdateTodo(!updateTodo);
        setTodoText("");
      })
      .catch((error) => {
        setHasError(true);
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add your Todo !"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit" id="button-addon2">
            Add
          </button>
        </div>
      </form>
      {hasError === true && (
        <ErrorModel
          errorMessage={errorMessage}
          closeModel={() => {
            setHasError(false), setTodoText("");
          }}
        />
      )}
    </>
  );
};
export default AddTodoForm;
