import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import axios from "axios";
import NavBar from "../../../../sections/NavBar";
import ContactDetailPopup from "../../../../components/PopUps/contactDetailPopUp";
import Spinner from "react-bootstrap/esm/Spinner";
import AddTable from "../MatchPersonPosts/addTable";
import FaceMatchingImg from './../../../../Images/faceMatching.gif';
import { Image } from "react-bootstrap";

const SearchPost = () => {

    const location = useLocation();
    let image = "";
    try {
        image = location?.state?.image;
    } catch (_ex) {

    }
    console.log("Image Received From Location Propse: ", image);
    const { postType } = useParams();
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
        setLoading(true);
        debugger;
        async function GetMatchedPosts() {
            console.log(Loading);
            try {
                const token = localStorage.getItem("x_auth_token");
                const formData = new FormData();
                formData.append("encoded", image);
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
        GetMatchedPosts();

    }, []);


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

    const getLabel = () => {
        return
    }


    return (
        <React.Fragment>
            <NavBar currentUser={localStorage.getItem("email")} />
            {
                Loading ?
                    (< section style={{ display: "flex", background: "white", minHeight: "60vh" }}>
                        {
                            <div className="d-flex  m-auto flex-column align-items-center">
                                <Spinner animation="border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </Spinner>
                                <h1>Matching</h1>
                                <div style={{ maxHeight: "2rem" }}>
                                    <Image src={FaceMatchingImg} alt="Face Matching Gif" fluid />
                                </div>
                            </div>
                        }
                    </section>
                    ) :
                    (< section id="listPerson" className="d-flex mt-1" style={{ backgroundColor: "white", minHeight: "90vh" }}>
                        {
                            SearchedPosts?.length > 0 ?
                                (
                                    <React.Fragment>

                                        <AddTable activeCases={SearchedPosts} detailLength={1000}
                                            handleContactModal={handleContactModal}
                                            label={<h4 style={{ color: "#ff0404" }}>Face Match Found: {' ' + SearchedPosts.length}</h4>}
                                        />
                                        <ContactDetailPopup
                                            show={contactModal.show}
                                            onHide={() => setContactModal({ ...contactModal, show: false })}
                                            details={contactModal.details}
                                            phone={contactModal.phone}
                                            founderName={contactModal.founderName}
                                            ownerEmail={contactModal.ownerEmail}
                                        />
                                    </React.Fragment>
                                ) : (<h3 style={{ margin: "auto" }}>No Match Found</h3>)
                        }
                    </section>)
            }
        </React.Fragment>
    );
};

export default SearchPost;
