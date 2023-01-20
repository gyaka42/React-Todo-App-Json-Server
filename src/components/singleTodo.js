import React from "react";

const SingleTodo = ({ todo }) => {
  return (
    <div
      className={
        todo.isDone === false
          ? "alert alert-secondary d-flex justify-content-between align-items-center"
          : "alert alert-success d-flex justify-content-between align-items-center"
      }
    >
      <div>
        <h1>{todo.text}</h1>
        <small>{new Date(todo.date).toLocaleString()}</small>
      </div>
      <div className="btn-group" role="group" aria-label="Basic example">
        <button className="btn btn-danger">Delete</button>
        <button className="btn btn-secondary">Edit</button>
        <button className="btn btn-primary">
          {todo.isDone === false ? "Done" : "Undone"}
        </button>
      </div>
    </div>
  );
};

export default SingleTodo;
