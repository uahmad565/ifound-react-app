import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from "../../../../sections/NavBar";
import AddTable from "./addTable";
import { DeleteActivePost, GetActiveCases, UpdatePostStatus } from "../../../../services/ActiveCasesService";
import Footer from "../../../../sections/Footer";
import { PostStatus, TargetType } from "../../../../Enums/Enums";

export default function MatchCases({ postType, toast }) {
  const [isValid, setIsValidState]=useState(false);
  const [ActiveCases, setActiveCases] = useState();
  const [activeButton, setActiveButton] = useState(1);

  const navigate = useNavigate();
  const { postStatus } = useParams();

  useEffect(() => {
    const getPersonPostData = async () => {

      GetActiveCases(postStatus, postType).then(({ data }) => {
        setIsValidState(true);
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
        setActiveCases(arr);
      }).catch(err => {
        setIsValidState(false);
        console.log(err.toString());
      });

    }
    getPersonPostData();
  }, [postType, postStatus])



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
      // console.log(':', response.data);
      const newActiveCases = ActiveCases.filter(post => post.postId !== postId);
      setActiveCases(newActiveCases);
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
      const newActiveCases = ActiveCases.filter(post => post.postId !== postId);
      setActiveCases(newActiveCases);
      toast.setToastMessage({ headerText: "Active Case", bodyText: `Post ${status == 1 ? "Resolved" : "" || status == 3 ? "UnResolved" : ""} Successfully` });
      toast.setShow(true);
    }).catch(err => {
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request failed\n" + err.message });
      toast.setShow(true);
    });
  }

  const onPostManageClick = (data) => {

    console.log("event: ", data);
    navigate(`/searchPost/${data.postId}/${data.postType}`);
  }

  return (
    isValid &&
    <React.Fragment>
      <NavBar currentUser={localStorage.getItem("email")} />
      <div className="container">
        <div className="p-2">
          <h2 >My {postType === TargetType.LOST ? "Lost" : "Found"} Cases </h2>
        </div>
        <div style={{ minHeight: "80vh" }}>
          <AddTable activeCases={ActiveCases}
            setActiveCases={setActiveCases}
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

      <Footer />
    </React.Fragment >
  );
}