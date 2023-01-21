import React from "react";
import "../components/ErrorModel.css";

const ErrorModel = ({
  errorMessage = "Server Error has occurd",
  closeModel,
}) => {
  return (
    <div className="ErrorModelContainer">
      <div className="ErrorModelTextContainer">
        <h1>Server Error</h1>
        <p>{errorMessage}</p>
        <div className="ErrorModelBtnContainer">
          <button onClick={closeModel} className="btn btn-primary">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModel;
