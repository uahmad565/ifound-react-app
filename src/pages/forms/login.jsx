import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Input from "../../components/Input";
import NavBar from "../../sections/NavBar"
import { Container } from "react-bootstrap";
import "./login.css";
import IFoundSvg from "../../components/Svgs/IfoundSvg";
import { Login as LoginApp, LoginWithGoogle, LoginWithFacebook, SetLocalStorage } from "../../services/AuthenticationService";
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import axios from "axios";


const externalUrlGoogle = `${process.env.REACT_APP_DOT_NET_API}api/Authenticate/account/external-login?provider=Google&returnUrl=http%3A%2F%2Flocalhost%3A3000%2F`;
const externalUrlFB = `${process.env.REACT_APP_DOT_NET_API}api/Authenticate/account/external-login?provider=Facebook&returnUrl=http%3A%2F%2Flocalhost%3A3000%2F`;


const Login = ({ setTokenForFooter }) => {
  // navigate hook
  const navigate = useNavigate();

  // data
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  let [progressbar, setProgressBar] = useState(false);

  const screenHeight = window.innerHeight;
  // Set the height of the to the current screen height

  // Update specific input field
  const handleChange = (e) =>
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    debugger;
    console.log("Button clicked", e);
    validate();
  };

  const handleExternalLogin = (url) => {
    setProgressBar(true);
    debugger;
    window.location.replace(url);
  }

  // send 400 in any case and show error
  const validate = async () => {
    try {
      setProgressBar(true);
      LoginApp(credentials).then(({ data }) => {
        SetLocalStorage(data);
        setProgressBar(false);
        navigate("/user-dashboard");
      }).catch(ex => {
        if (axios.isAxiosError(ex)) {
          setError("Network Error");
        } else if (ex?.response?.status >= 500 && ex.response.status < 600)
          setError("Internal Server Error. Please Try again");
        else if (ex.response.status >= 400 && ex.response.status <= 499)
          setError("Invalid Credentials");
        else
          setError("Please Contact Support. Error Occured");

        setProgressBar(false);
      });

    } catch (err) {
      const error = err.response ? err.response.data : err.response;
      setError(error);
    }
  };

  return (
    <div className="bg-white full-height" >
      <NavBar currentUser={localStorage.getItem("email")} />
      {localStorage.getItem("email") && (
        <Navigate to="/user-dashboard" replace={true} />
      )}

      <Container >
        <div className="login-col">
          {/* <div className="box"> */}
          <div id="ifound-svg" className="svg-logo">
            <IFoundSvg height={"30px"} width={"7rem"} />

          </div>
          <div id="Sign In Heading" className="auth-form-header">
            <h1>
              Sign in to IFound
            </h1>
          </div>
          <div className="box">
            <form onSubmit={(e) => handleLoginSubmit(e)}>
              <div className="w-100">
                <Input
                  autofocus={true}
                  label="Email"
                  type="email"
                  placeholder="email"
                  name="email"
                  value={credentials.email}
                  handleChange={(e) => handleChange(e)}
                  style={{}}
                  required
                />
              </div>
              <div className="w-100">
                <Input
                  autofocus={false}
                  label="Password"
                  type="password"
                  placeholder="password"
                  name="password"
                  value={credentials.password}
                  handleChange={(e) => handleChange(e)}
                  style={{}}
                  required
                />
              </div>

              <p className="mb-1" style={{ color: "red" }}>
                {error}
              </p>
              <div className="login-btns w-100">
                <div className="ms-1 me-1 mb-2">
                  <button style={{ height: "50px" }} className="btn btn-primary w-100 fs-5" disabled={progressbar}>Login</button>
                </div>
                <FacebookLoginButton className="mb-2" onClick={() => handleExternalLogin(externalUrlFB)} disabled={progressbar} />
                <GoogleLoginButton onClick={() => handleExternalLogin(externalUrlGoogle)} disabled={progressbar} />
              </div>
              <p style={{ marginBottom: "1rem", marginTop: "1rem" }}>
                Not Registered? <Link to="/signup">Sign up</Link>
              </p>
              {progressbar && (
                <div class="spinner-grow fonts" role="status">
                  <span class="visually-hidden">Loading...</span>
                </div>
              )}
            </form>
          </div>
        </div>

      </Container>
    </div>
  );
};

export default Login;