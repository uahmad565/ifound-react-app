import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "../../../../sections/NavBar";
import AddTable from "./addTable";
import { DeleteActivePost, UpdatePostStatus } from "../../../../services/ActiveCasesService";
// import Footer from "../../../../sections/Footer";
import { Box, LinearProgress } from "@mui/material";
import useSWR from "swr";
import MFooter from "../../../../sections/MaterialFooter/MFooter";
import { PostStatus, TargetType } from "../../../../Enums/Enums";
import axios from "axios";
import Spinner from "react-bootstrap/esm/Spinner";

const GetActiveCases = (token, postStatus, postType) => {

  return axios.get(`${process.env.REACT_APP_DOT_NET_API}api/home/activeCases/${postStatus}/${postType}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  ).then(({ data }) => {
    const arr = data.map(element => {
      const postId = element.postPersonId;
      const name = element.targetPersonDto.name;
      const age = element.targetPersonDto.age;
      const city = element.targetPersonDto.location;
      const details = element.targetPersonDto.description;
      const image = element.imageDto.base64String;
      const date = element.postDate;
      const gender = element.targetPersonDto.gender;
      const postType = element.targetPersonDto.targetId;
      return { postId, name, age, city, details, image, date, gender, postType };
    });
    return arr;
  });
}

export default function MatchCases({ postType, toast }) {

  const [activeButton, setActiveButton] = useState(1);
  const navigate = useNavigate();
  const { postStatus } = useParams();
  const token = localStorage.getItem("x_auth_token");
  const { data: ActiveCases, error: myEror, isLoading } = useSWR([token, postStatus, postType], ([token, postStatus, postType]) => GetActiveCases(token, postStatus, postType))
  // debugger;
  // if (myEror)
  //   navigate("/error", {
  //     state: {
  //       description: "Unhandled Error" + myEror.toString(),
  //       heading: "Error Occured"
  //     }
  //   });

  const handleButtonGroupClick = (value) => {
    setActiveButton(value);
    switch (postType) {
      case TargetType.LOST:
        if (value == 1)
          navigate(`/lostMatchCases/${PostStatus.Unresolved}`);
        else if (value == 2)
          navigate(`/lostMatchCases/${PostStatus.Resolved}`);
        break;
      case TargetType.FOUND:
        if (value == 1)
          navigate(`/foundMatchCases/${PostStatus.Unresolved}`);
        else if (value == 2)
          navigate(`/foundMatchCases/${PostStatus.Resolved}`);
        break;
      default:
        break;
    }

  };

  const handleDeleteActivePost = (postId) => {
    // Handle option change event
    DeleteActivePost(postId).then(_response => {

      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request successful" });
      toast.setShow(true);
    }).catch(error => {
      console.error('DELETE request failed:', error);
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request failed" });
      toast.setShow(true);
    });
  }

  const handleMarkAsResolve = (postId, status) => {

    UpdatePostStatus(postId, status).then(_response => {
      toast.setToastMessage({ headerText: "Active Case", bodyText: `Post ${status == 1 ? "Resolved" : "" || status == 3 ? "UnResolved" : ""} Successfully` });
      toast.setShow(true);
    }).catch(err => {
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request failed\n" + err.message });
      toast.setShow(true);
    });
  }

  const onPostManageClick = (data) => {

    console.log("event: ", data);
    navigate(`/searchPost/${data.postId}/${data.postType}`, { state: { image: data.image } });
    // navigate('/componentB',);
  }

  // if (isLoading)
  //   return (<div>
  //     <Box sx={{ width: '100%' }}>
  //       <LinearProgress />
  //       <h3>Loading..</h3>
  //     </Box>
  //   </div>
  //   )

  return (
    <React.Fragment>
      <NavBar currentUser={localStorage.getItem("email")} />
      <div className="container">
        <div className="p-2">
          <h2 >My {postType === TargetType.LOST ? "Lost" : "Found"} Cases </h2>
        </div>

        <div style={{ minHeight: "80vh" }}>
          <AddTable activeCases={ActiveCases}
            toast={toast}
            handleDeleteActivePost={handleDeleteActivePost}
            onPostManageClick={onPostManageClick}
            handleMarkAsResolve={handleMarkAsResolve}
            activeButton={activeButton}
            handleButtonClick={handleButtonGroupClick}
          />
          {/* <Button onClick={() => setShow(true)} >Hit Toast</Button> */}

        </div>
      </div>

      <MFooter />
    </React.Fragment >
  );
}