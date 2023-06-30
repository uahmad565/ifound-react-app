import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import NavBar from "../../../../sections/NavBar";
import IfPostDetail from "../../../../components/DesignComponents/ifPostDetail";
import ContactDetailPopup from "../../../../components/PopUps/contactDetailPopUp";
import { Button } from "rsuite";
import Spinner from "react-bootstrap/esm/Spinner";
import AddTable from "../MatchPersonPosts/addTable";
import { GetCurrentPost } from "../../../../services/GetPostService";

const SearchPost = () => {

    const { id, postType } = useParams();
    const [post, setPost] = useState({});

    const [Loading, setLoading] = useState(false);
    const [SearchedPosts, setSearchedPosts] = useState();

    const [contactModal, setContactModal] = React.useState({
        details: "",
        phone: "",
        founderName: "",
        ownerEmail: "",
        show: false,
    });

    useEffect(() => {

        const getPost = async () => {
            GetCurrentPost(id, postType).then(({ data: currentPost }) => {
                const newObj = {
                    "postId": currentPost.postPersonId,
                    "name": currentPost.targetPersonDto.name,
                    "age": currentPost.targetPersonDto.age,
                    "city": currentPost.targetPersonDto.location,
                    "details": currentPost.targetPersonDto.description,
                    "image": currentPost.imageDto.base64String,
                    "date": currentPost.postDate,
                    "gender": currentPost.targetPersonDto.gender,
                    "targetType": currentPost.targetPersonDto.targetId,
                    "phone": currentPost.phone,
                    "founderName": currentPost.ownerPost
                }
                setPost(newObj);



                //const newActiveCases = ActiveCases.filter(post => post.postId !== postId);
                //setActiveCases(newActiveCases);
                //toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request successful" });
                //toast.setShow(true);
            }).catch(error => {
                console.error('DELETE request failed:', error);
                // toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request failed" });
                // toast.setShow(true);
            });

        };

        getPost();
    }, []);

    const handleSearchPost = async () => {

        setLoading(true);
        console.log(Loading);
        try {
            const token = localStorage.getItem("x_auth_token");
            const formData = new FormData();
            formData.append("encoded", post.image);
            const { data: matchedPosts } = await axios
                .post(`${process.env.REACT_APP_DOT_NET_API}api/home/searchPerson/${postType}`, formData,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            console.log("Searched Entries: ", matchedPosts);

            const arr = [];
            for (let element of matchedPosts) {
                const name = element.targetPersonDto.name;
                const age = element.targetPersonDto.age;
                const city = element.targetPersonDto.location;
                const details = element.targetPersonDto.description;
                const image = element.imageDto.base64String;
                const confidence = element.confidence;
                const phone = element.phone;
                const userID = element.userID;
                const date = element.postDate;
                const founderName = element.ownerPost;
                const ownerEmail = element.ownerEmail;
                arr.push({ phone, name, age, city, details, image, confidence, userID, founderName, ownerEmail, date });
            }
            setSearchedPosts(arr);
            setLoading(false);
        } catch (err) {
            console.log(err.toString());
        }

    }

    const handleContactModal = (activePost) => {
        setContactModal({
            ...contactModal,
            details: activePost.details,
            phone: activePost.phone,
            founderName: activePost.founderName,
            ownerEmail: activePost.ownerEmail,
            show: true
        });
    }

    return (
        <React.Fragment>
            <NavBar currentUser={localStorage.getItem("email")} />
            <IfPostDetail postDetail={post}></IfPostDetail>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                    className="btn btn-primary m-4 "
                    color="blue"
                    appearance="primary"
                    onClick={handleSearchPost}
                >
                    Match
                </Button>
            </div>
            {
                Loading ?
                    (< section style={{ display: "flex", backgroundColor: "white", minHeight: "60vh" }}>
                        {
                            <div className="d-flex  m-auto flex-column align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <h1>Matching</h1>
                            </div>
                        }
                    </section>
                    ) :
                    (< section id="listPerson" className="d-flex mt-1" style={{ backgroundColor: "white", minHeight: "60vh" }}>
                        {
                            SearchedPosts?.length > 0 ?
                                (
                                    <React.Fragment>
                                        <AddTable activeCases={SearchedPosts} detailLength={1000}
                                            handleContactModal={handleContactModal} />
                                        <ContactDetailPopup
                                            show={contactModal.show}
                                            onHide={() => setContactModal({ ...contactModal, show: false })}
                                            details={contactModal.details}
                                            phone={contactModal.phone}
                                            founderName={contactModal.founderName}
                                            ownerEmail={contactModal.ownerEmail}
                                        />
                                    </React.Fragment>
                                ) : <h3 style={{ margin: "auto" }}>No Match Found</h3>
                        }
                    </section>)
            }
        </React.Fragment>
    );
};

export default SearchPost;
