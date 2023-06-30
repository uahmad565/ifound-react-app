import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardButton from "../../../components/DashboardButton";
import Details from "../../details/Details";
import axios from "axios";
import NavBar from "../../../sections/NavBar";

function AdminDashboard() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState("");
  useEffect(() => {
    const validate = async () => {
      // authentication token
      const token = localStorage.getItem("x_auth_token");
      // Request made to the backend api
      // Send formData object
      let userType;
      try {
        userType = await axios.post(
          `${process.env.REACT_APP_NODE_API}verifyToken`,
          userType,
          {
            headers: {
              x_auth_token: token,
            },
          }
        );
        if (userType.data === "admin") setValidate("true");
        else if (userType.data === "user") navigate("/user-dashboard");
        else if (userType.data === "police") navigate("/police-dashboard");
        else navigate("/notFound");
      } catch (err) {
        if (!userType) {
          navigate("/notFound");
        }
      }
    };

    validate();
  });

  return (
    validate === "true" && (
      <React.Fragment>
        <NavBar currentUser={localStorage.getItem("email")} />
        <h1 className="App-header">Admin Dashboard</h1>
        <div className="row">
          <div className="col ">
            <img
              src="https://www.linkpicture.com/q/PrimeMinisterNawazSharif.jpg"
              className="card-img-top"
              style={{
                marginTop: "0.25rem",
                marginLeft: "2.5rem",
                borderRadius: "1rem",
                width: "13rem",
                height: "17rem",
              }}
            />
            <Details />
          </div>

          <div className="col bg-list" style={{ height: "fit-content" }}>
            <div className="row">
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Add User"
                  navTo="/signup"
                ></DashboardButton>
              </div>
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Remove User"
                  navTo="/signup"
                  PostType="MissingPerson"
                ></DashboardButton>
              </div>
            </div>
            <div className="row">
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Post Found Thing"
                  navTo="/upload-thing"
                  PostType="FoundThing"
                ></DashboardButton>
              </div>
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Post Found Person/ Child"
                  navTo="/upload-person"
                  PostType="FoundPerson"
                ></DashboardButton>
              </div>
            </div>
            <div className="row">
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Post Missing Thing"
                  navTo="/upload-thing"
                  PostType="MissingThing"
                ></DashboardButton>
              </div>
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Post Missing Person/ Child"
                  navTo="/upload-person"
                  PostType="MissingPerson"
                ></DashboardButton>
              </div>
            </div>
            <div className="row">
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="Reported Posts"
                  navTo="/matched-cases"
                  value={2}
                ></DashboardButton>
              </div>
              <div
                className="col"
                style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
              >
                <DashboardButton
                  title="View Reports"
                  navTo="/resolved-cases"
                  value={5}
                ></DashboardButton>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  );
}

export default AdminDashboard;
