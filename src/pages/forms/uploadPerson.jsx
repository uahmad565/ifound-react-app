import { useNavigate,  } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
// import DropdownButton from 'react-bootstrap/DropdownButton';
import React, { useState } from "react";
import Input from "../../components/Input";
import axios from "axios";

import { GenderType, RelationType, TargetType } from "../../Enums/Enums";
import Dropdown from "./dropdown";
import NavBar from "../../sections/NavBar"
import { cities } from "../../static/static";
import IfFormOption from "./ifFormOption";

import useTokenValidate from "../validateTokenHook";

const UploadPerson = ({ PostType, ApiUrl }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("x_auth_token");
  const isValidToken = useTokenValidate(token);


  const [selectedOption, setSelectedOption] = useState(TargetType.LOST);


  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    console.log("Selected Option: ", selectedOption);
    event.target.value === TargetType.LOST ? navigate("/uploadLostPerson") : navigate("/uploadFoundPerson");
    return;
  }


  // handle submit button event
  const handleUploadPersonSubmit = async (e) => {
    e.preventDefault();

    // checking fileds data before sending request

    // if (!credentials.name) {
    //   const message = "Name cannot be Empty.";
    //   setMessage(message);
    //   return;
    // }

    // if (!credentials.age) {
    //   const message = "Age cannot be Empty. You can enter an approximate age.";
    //   setMessage(message);
    //   return;
    // }
    // if (!credentials.city) {
    //   const message = "City cannot be Empty.";
    //   setMessage(message);
    //   return;
    // }
    // if (!credentials.detail) {
    //   const message =
    //     "Details cannot be Empty. Please enter few lines of details.";
    //   setMessage(message);
    //   return;
    // }
    if (!selectedFile) {
      setError({
        message: "Please attach one Picture.",
        hasError: true
      });
      return;
    }
    // Create an object of formData
    // "Base64Image,Description,Location, Age,Name,

    console.log("Selected File: ", selectedFile);
    const formData = new FormData();

    // Attaching the data to the form
    formData.append("Name", credentials.name);
    formData.append("Age", credentials.age);
    formData.append("Location", credentials.city);
    formData.append("Description", credentials.detail);
    formData.append("TargetType", PostType);
    formData.append("Image", selectedFile, selectedFile.name);
    formData.append("Gender", credentials.genderType);
    formData.append("Relation", credentials.relationType);
    formData.append("Phone", credentials.phone);

    try {
      const token = localStorage.getItem("x_auth_token");

      const responseObj = await axios.post(
        ApiUrl,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
      if (responseObj.status === 500) {
        setError({
          hasError: true,
          message: "Internal Server Error"
        });
      }
      else if (responseObj.status === 200) {
        setMessage("saved");
        console.log(message);

        let nav = "/user-dashboard";

        navigate("/LoadingPage", {
          state: {
            message: "Post added Successfully. ",
            navigate: nav,
          },
        });
      }
      // setCredentials({
      //   name: "",
      //   category: "category",
      //   color: "color",
      //   city: "city",
      //   detail: "",
      //   genderType: GenderType.Male,
      //   relationType: RelationType.Brother,
      //   postType: PostType,
      // });
      // const image = "";
      // setSelectedFile(image); // clearing form
      // setMessage(message);
    } catch (err) {
      if (err.response.data.errors) {
        const message = Object.values(err.response.data.errors)[0];
        setError({
          hasError: true,
          message: message
        });
      }
      else {
        const message = err.response.data;
        setError({
          hasError: true,
          message: message
        });
      }
    }
  };

  // On file select (from the pop up)
  const onFileChange = (event) => {
    // Update the selectedFile
    try {
      const data = event.target.files[0];
      setpreviewFile(URL.createObjectURL(event.target.files[0]));
      setSelectedFile(data);
    } catch (err) {
      setpreviewFile(null);
      setSelectedFile(null);
      console.log(err);
    }

  };

  // Update specific input field
  const handleChange = (e) =>
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));

  // form data

  var [credentials, setCredentials] = useState({
    name: "",
    age: "",
    detail: "",
    city: "",
    genderType: Object.values(GenderType)[0],
    relationType: Object.values(GenderType)[1],
    postType: PostType, // setting the postType
    phone: ""
  });
  var [selectedFile, setSelectedFile] = useState("");
  var [previewFile, setpreviewFile] = useState("");
  var [message, setMessage] = useState("");
  const [error, setError] = useState({
    hasError: false,
    message: ""
  });
  const [progressbar, _setProgressbar] = useState("");
  ;
  // Set the height of the to the current screen height
  console.log("isValidToken: " + isValidToken);
  // return
  return (
    <React.Fragment>
      {
        isValidToken === true &&
        (<>
          <NavBar currentUser={localStorage.getItem("email")} />
          <div className="row" style={{ minHeight: "80vh" }}>
            <div
              className="col-3 mt-5 center"
              style={{ width: "40%", height: "100%" }}
            >
              <img
                src="https://i.ibb.co/tBYg2xv/bg-pic.png"
                alt="..."
                width="auto"
                height="500"
              />
            </div>
            <div className="col-4 center">

              <div className="bg-light mt-2" style={{ width: "22rem" }}>
                <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                  <IfFormOption
                    option1={{
                      value: TargetType.LOST,
                      label: "Lost Person"
                    }}
                    option2={{
                      value: TargetType.FOUND,
                      label: "Found Person"
                    }}
                    handleOptionChange={handleOptionChange}
                    selectedOption={selectedOption}
                  />
                  <div className="App-header mb-2">{PostType === TargetType.FOUND ? <h3>Found Person</h3> : <h3>Lost Person</h3>}</div>

                </div>

                <form onSubmit={(e) => handleUploadPersonSubmit(e)}>
                  <Input
                    autofocus={true}
                    label="Name"
                    type="text"
                    placeholder="name"
                    name="name"
                    value={credentials.name}
                    handleChange={(e) => handleChange(e)}
                  />
                  <Input
                    autofocus={false}
                    label="Age"
                    type="number"
                    placeholder="age"
                    name="age"
                    value={credentials.age}
                    handleChange={(e) => handleChange(e)}
                    min="1"
                    max="5"
                  />
                  {/* <div style={{ marginBottom: 20, marginLeft: -30 }}> */}
                    <PhoneInput
                      placeholder="Enter phone number"
                      name="phone"
                      value={credentials.phone}
                      onChange={(e) => setCredentials((prevState) => ({
                        ...prevState,
                        phone: e,
                      }))}
                    />
                  {/* </div> */}
                  {/* <Input
                autofocus={false}
                label="City"
                type="text"
                placeholder="city"
                name="city"
                value={credentials.city}
                handleChange={(e) => handleChange(e)}
              /> */}
                  <Dropdown
                    name="city"
                    options={cities}
                    handleChange={handleChange}
                    opacity={10}
                  />
                  <Input
                    autofocus={false}
                    label="Detail"
                    type="text"
                    placeholder="detail"
                    name="detail"
                    value={credentials.detail}
                    handleChange={(e) => handleChange(e)}
                  />
                  <Dropdown
                    name="genderType"
                    options={Object.keys(GenderType)}
                    handleChange={handleChange}
                    opacity={10}
                  ></Dropdown>
                  <Dropdown
                    name="relationType"
                    options={Object.keys(RelationType)}
                    handleChange={handleChange}
                    opacity={10}
                  ></Dropdown>
                  <Input
                    id="imageUpload"
                    type="file"
                    name="upload picture"
                    placeholder="Photo"
                    required=""
                    capture
                    handleChange={(e) => onFileChange(e)}
                  />
                  {previewFile && (
                    <img
                      alt="Image Choosen by User"
                      src={previewFile}
                      style={{ width: "5rem", height: "5rem", marginLeft: "10rem" }}
                    ></img>
                  )}
                  {
                    error.hasError && (<div class="mt-2 alert alert-danger alert-dismissible fade show">
                      <strong>Error!</strong> {error.message}
                    </div>)
                  }

                  {progressbar && (
                    <div className="spinner-grow fonts" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "8rem", marginBottom: "1rem" }}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </>)
      }
    </React.Fragment>
  );
};

export default UploadPerson;