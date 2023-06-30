import React, { Component } from "react";
import "./ErrorPage.scss";
import { useLocation } from 'react-router-dom';

const ErrorPage = () => {

  const location = useLocation();
  const { description, heading } = location.state;
  console.log(location);

  return (
    <div className="Error bg-white">
      <div >
        <div className="fs-3 App-header">
          {heading ? heading : 'Internal Server Error'}
        </div>
        <div className="fs-5">{description ? description : "Error Couldn't be predicted"}</div>
      </div>
    </div>
  );
};

export default ErrorPage;
