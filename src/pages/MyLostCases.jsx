import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { DeleteActivePost, GetActiveCases, UpdatePostStatus } from "../services/ActiveCasesService";
import { PostStatus, TargetType } from "../Enums/Enums";
import RenderCases from "./lists/RenderCases";
import NavBar from "../sections/NavBar";
import Footer from "../sections/Footer";

export default function MyLostCases({ toast }) {
    const postType = TargetType.LOST;
    const [isValid, setIsValidState] = useState(false);
    const [ActiveCases, setActiveCases] = useState(null);
    const [ResolvedCases, setResolvedCases] = useState();
    const [activeButton, setActiveButton] = useState(1);
    const [showCasesType, setShowCasesType] = useState(PostStatus.Unresolved);
    const navigate = useNavigate();
    //const { postStatus } = useParams();

    useEffect(() => {
        const getPersonPostData = async () => {
            function loadApi(postStatus, setFunction) {
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
                    setFunction(arr);
                }).catch(err => {
                    setIsValidState(false);
                    console.log(err.toString());
                });
            }
            loadApi(PostStatus.Unresolved, setActiveCases);
            loadApi(PostStatus.Resolved, setResolvedCases);

        }
        getPersonPostData();
        console.log('MyLost Component mounted or route changed');
        // Perform any necessary actions or fetch data here

        return () => {
            console.log('MyLost Cleaning Component unmounted or route changed');
            // Clean up any resources or subscriptions here
        };
    }, [])



    const handleButtonGroupClick = (value) => {
        setActiveButton(value);
        switch (postType) {
            case TargetType.LOST:
                if (value == 1)
                    setShowCasesType(PostStatus.Unresolved);
                else if (value == 2)
                    setShowCasesType(PostStatus.Resolved);
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

            <RenderCases
                ActiveCases={showCasesType === PostStatus.Unresolved ? ActiveCases : (showCasesType === PostStatus.Resolved ? ResolvedCases : null)}
                setActiveCases={showCasesType === PostStatus.Unresolved ? setActiveCases : (showCasesType === PostStatus.Resolved ? setResolvedCases : null)}
                toast={toast}
                handleDeleteActivePost={handleDeleteActivePost}
                onPostManageClick={onPostManageClick}
                handleMarkAsResolve={handleMarkAsResolve}
                activeButton={activeButton}
                handleButtonGroupClick={handleButtonGroupClick}
                postType={postType}
            />
            <Footer />
        </React.Fragment >
    );
}