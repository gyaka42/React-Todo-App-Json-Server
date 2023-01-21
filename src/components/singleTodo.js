import React, { useState } from "react";
import ErrorModel from "./ErrorModel";
import axios from "axios";

const SingleTodo = ({
  todo,
  updateTodo,
  setUpdateTodo,
  imgShow,
  setImgShow,
}) => {
  const [handleEditTodo, setHandleEditTodo] = useState(false);
  const [newTodoText, setNewTodoText] = useState(todo.text);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleEdit = (event) => {
    event.preventDefault();
    /* Validation */
    if (newTodoText === "") {
      setHasError(true);
      setErrorMessage("The Todo text entry can`t be empty !");
      return;
    }
    if (newTodoText.length < 3) {
      setHasError(true);
      setErrorMessage("The Todo text needs to be at least 3 characters long !");
      return;
    }
    const updatedTodo = {
      ...todo,
      text: newTodoText,
      date: new Date(),
    };
    axios
      .put(`http://localhost:3004/todos/${todo.id}`, updatedTodo)
      .then((res) => {
        setUpdateTodo(!updateTodo);
        setHandleEditTodo(false);
      })
      .catch((error) => {
        setHasError(true);
        setErrorMessage("There was an Error during updating Todo");
      });
  };

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3004/todos/${todo.id}`)
      .then((res) => {
        setImgShow(false);
        setUpdateTodo(!updateTodo);
      })
      .catch(() => {
        setHasError(true);
        setErrorMessage("There was an Error during deleting Todo");
      });
  };

  const handleDone = () => {
    const changedDone = {
      ...todo,
      isDone: !todo.isDone,
      date: new Date(),
    };
    axios
      .put(`http://localhost:3004/todos/${todo.id}`, changedDone)
      .then((res) => {
        setUpdateTodo(!updateTodo);
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage(
          "There was an Error while changing to Done/Undone Todo"
        );
      });
  };

  return (
    <>
      <div
        className={
          todo.isDone === false
            ? "alert alert-secondary d-flex justify-content-between align-items-center"
            : "alert alert-success d-flex justify-content-between align-items-center"
        }
      >
        <div>
          {handleEditTodo === true ? (
            <form onSubmit={handleEdit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Add your Todo !"
                  value={newTodoText}
                  onChange={(event) => setNewTodoText(event.target.value)}
                />
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
                <button
                  onClick={() => {
                    setHandleEditTodo(false);
                    setNewTodoText(todo.text);
                  }}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <h1>{todo.text}</h1>
          )}

          <small>{new Date(todo.date).toLocaleString()}</small>
        </div>
        {handleEditTodo === false && (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
            <button
              onClick={() => setHandleEditTodo(true)}
              className="btn btn-secondary"
            >
              Edit
            </button>
            <button onClick={handleDone} className="btn btn-primary">
              {todo.isDone === false ? "Done" : "Undone"}
            </button>
          </div>
        )}
      </div>
      {hasError === true && (
        <ErrorModel
          errorMessage={errorMessage}
          closeModel={() => {
            setHasError(false);
          }}
        />
      )}
    </>
  );
};

export default SingleTodo;
