import React, { useState } from "react";
import PersonPost from "../../../components/DesignComponents/PersonPost";
import Spinner from "react-bootstrap/esm/Spinner";
import Pagination from "../../../components/Pagination";
import "../../../styles/IFoundLoading.scss";
import { Col, Container, Image, Row } from "react-bootstrap";
import { PersonCard } from "./PersonCard";


const IfPersonList = ({ recordsPerPage, PersonPosts, loading, deletePermission, handleDeleteActivePost }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const screenHeight = window.innerHeight;
    // Set the height of the current screen height
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = PersonPosts.slice(indexOfFirstRecord, indexOfLastRecord);
    const nPages = Math.ceil(PersonPosts.length / recordsPerPage);
    console.log(currentRecords)

    if (loading)
        return (<div className="i-loading-bar-center">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
            <h1>Loading</h1>
        </div>)
    else {
        return (
            <React.Fragment>
                <Row className="if-bg-color mb-4">
                    {
                        currentRecords?.length && currentRecords.map((value, index) => (
                            <Col md={6} className="mb-4 mb-md-4">
                                <PersonCard
                                    name={value.name}
                                    age={value.age}
                                    date={value.date.toString()}
                                    location={value.city}
                                    postType={value.targetType}
                                    gender={value.gender}
                                    image={value.image}
                                    postId={value.postId}
                                />
                            </Col>))
                    }
                </Row>
                <Pagination className="m-3"
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />             
            </React.Fragment>
        );
    }
}

export default IfPersonList;
