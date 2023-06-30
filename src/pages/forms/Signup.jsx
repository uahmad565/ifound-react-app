import React, { useState, Component, createRef } from "react";
import { Navigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, db, storage } from "../../firebase";
import Input from "../../components/Input";
import axios from "axios";
import NavBar from "../../sections/NavBar";
import { RegisterUser } from "../../services/AuthenticationService";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      credentials: { name: "", email: "", password: "", userType: "user" },
      error: "",
      success: "",
      progressbar: "",
      messageShow: "",
    };
  }

  handleChange = (e) => {
    const credentials = { ...this.state.credentials };
    credentials[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ credentials });
  };

  registerUserFirebase = async ({ displayName, email, password }) => {

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      try {
        //Update profile
        await updateProfile(res.user, {
          displayName,
        });
        //create user on firestore
        await setDoc(doc(db, "users", res.user.uid), {
          uid: res.user.uid,
          displayName,
          email,
        });

        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", res.user.uid), {});
      } catch (err) {
        console.log(err);
      }
    } catch (err) {
      console.log(err);

    }
  };

  handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log(
      `submitted \nName: ${this.state.credentials.name}\nPassword: ${this.state.credentials.password}\nEmail: ${this.state.credentials.email}\nUserType:${this.state.credentials.userType}`
    );
    this.validate();
  };

  async validate() {
    const { credentials } = this.state;

    RegisterUser(credentials).then(_res => {
      const success = true;
      this.setState({ progressbar: "true" });
      this.setState({
        messageShow: "User added successfully. Navigating to Login Screen...",
      });

      this.registerUserFirebase({ displayName: this.state.credentials.email, email: this.state.credentials.email, password: this.state.credentials.password })
      setTimeout(() => {
        this.setState({ progressbar: "" });
        this.setState({ success });
      }, 4000);

    }).catch(error => {
      this.setState({
        messageShow: "Error:" + error.toString(),
      });
    });

  }

  render() {

    const { name } = this.state.credentials;
    const { password } = this.state.credentials;
    const { email } = this.state.credentials;
    const { error } = this.state;
    const { progressbar } = this.state;
    const { messageShow } = this.state;

    const screenHeight = window.innerHeight;
    // Set the height of the to the current screen height

    return (
      <React.Fragment>
        <NavBar currentUser={localStorage.getItem("email")} />
        {this.state.success && <Navigate to="/login" replace={true} />}
        <div style={{ minHeight: screenHeight }}>
          <div className="row">
            <div
              className="col-3 mt-5 center"
              style={{ width: "40%", height: "100%" }}
            >
              <img
                src="https://i.ibb.co/tBYg2xv/bg-pic.png"
                className="card-img-top"
                width="auto"
                height="500"
              />
            </div>
            <div className="col-4 center">
              <div className="bg-light mt-2" style={{ width: "20rem" }}>
                <h1 className="App-header">Sign up</h1>
                <form onSubmit={this.handleSignupSubmit}>
                  <Input
                    autofocus={true}
                    label="Name"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={name}
                    handleChange={this.handleChange}
                  />
                  <Input
                    autofocus={false}
                    label="Email"
                    type="email"
                    placeholder="xyz@email.com"
                    name="email"
                    value={email}
                    handleChange={this.handleChange}
                  />
                  <Input
                    autofocus={false}
                    label="Password"
                    type="password"
                    placeholder="password"
                    name="password"
                    value={password}
                    handleChange={this.handleChange}
                  />
                  <p
                    style={{
                      marginLeft: "2rem",
                      marginBottom: "1rem",
                      color: "red",
                    }}
                  >
                    {error}
                  </p>

                  <p
                    style={{
                      marginLeft: "2rem",
                      marginBottom: "1rem",
                      color: "green",
                    }}
                  >
                    {messageShow}
                  </p>

                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "8rem", marginBottom: "1rem" }}
                  >
                    Submit
                  </button>

                  {progressbar && (
                    <div class="spinner-grow fonts" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Signup;
