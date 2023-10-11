import React from "react";
import ReactDOM from "react-dom/client";
import axios from "axios";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "rsuite/dist/rsuite.min.css";
import history from "./customRouter/customHistory";

//Axios Configuration
const app = axios.create({
  baseURL: "",
  headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
  },
  withCredentials: true
})


registerAxiosInterceptor();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <div >
    <App />
  </div>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


function registerAxiosInterceptor() {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      debugger;

      if (error.response) {
        // The request was made and the server responded with a status code
        if (error.response.status === 401) {
          // Handle unauthorized error (e.g., redirect to login)
          localStorage.clear();
          window.location.href = '/login';
        } else if (error.response.status === 404) {

          history.push("/error", {
            description: "Not What you are looking for?",
            heading: "404 Not Found"
          });

        } else {
          // Handle other errors
          console.log('An error occurred:', );
        }
      } else if (error.request) {
        // The request was made, but no response was received
        
        history.push("/error", {
          heading: "No Response Received",
          description: "The request was made, but no response was received",
        });
        console.log('No response received:', error.request);
      } else {
        // Something else happened while setting up the request
        console.log('Error:', error.message);
      }
      return Promise.reject(error);
    }
  );
}