import { useState } from "react";
import React from "react";
import axios from "axios";
import { Col, Button, ButtonGroup, Row, Dropdown, Container, Image } from "react-bootstrap";
// import { Container } from "rsuite";
import { COLORS } from "../../../../styles/globalColors.js";
import LocationIcon from "../../../../components/Svgs/locationIcon.jsx";
import { ActiveCasesMenu, PostStatus } from "../../../../Enums/Enums.js";
import './addTable.scss';


const actionButtons = ["Active", "Resolved"];

const CustomToggleButton = React.forwardRef(({ children, onClick }, ref) => {
    return (
        <div
            ref={ref}
            onClick={onClick}
            style={{ cursor: 'pointer' }}
        >
            <span>
                <svg aria-label="More Options" class="_ab6-" color="rgb(0, 0, 0)" fill="rgb(0, 0, 0)" height="24" role="img" viewBox="0 0 24 24" width="24"><circle cx="12" cy="12" r="1.5"></circle><circle cx="6" cy="12" r="1.5"></circle><circle cx="18" cy="12" r="1.5"></circle></svg>
            </span>
            {children}
        </div>
    );
});

//Controlled Component
function AddTable({ activeCases, toast, handleDeleteActivePost, handleMarkAsResolve, onPostManageClick, detailLength, handleContactModal, activeButton, handleButtonClick }) {
    console.log(toast);
    console.log("add table cases: ", activeCases);
    const maxLength = detailLength ? detailLength : 150;
    // const maxLength=150;

    return (
        <div style={{ maxWidth: "1000px", margin: "auto" }}>
            {!handleContactModal && (
                <ButtonGroup>
                    <Button
                        onClick={() => handleButtonClick(1)}
                        active={activeButton == 1} // auto-focus on button1 when it's active
                    >
                        {actionButtons[0]}
                    </Button>
                    <Button
                        onClick={() => handleButtonClick(2)}
                        active={activeButton === 2} // auto-focus on button2 when it's active
                    >
                        {actionButtons[1]}
                    </Button>
                </ButtonGroup>
            )}
            <div >
                {
                    activeCases && activeCases.map((activePost, index) => (
                        <Container  >
                            <Row className="bg-white justify-content-md-betwen m-1 border border-secondary p-2" key={index}>
                                <Col lg={3} className="d-flex align-items-center justify-content-center">
                                    <Image className="center-cropped" src={"data:image/jpg;base64," + activePost.image} ></Image>
                                </Col>
                                <Col lg={8} className="d-flex flex-column justify-content-around">
                                    <div className="ms-auto me-auto" style={{ width: '70%' }}>
                                        <div>
                                            <p className="h5 fw-bold">{activePost.name}</p>
                                            <strong> {activePost?.confidence?.toFixed(2)}</strong>
                                        </div>
                                        <div className="p-1 ">
                                            <div className="border-top fw-light">
                                                <p className="fw-light">
                                                    {activePost.details.slice(0, maxLength) + (activePost.details.length > maxLength ? "..." : "")}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="d-flex align-items-center mt-2 mb-2">
                                            {activeButton == 1 && onPostManageClick && <Button onClick={() => onPostManageClick(activePost)} variant="outline-secondary" size="sm">Manage</Button>}
                                            {handleDeleteActivePost &&
                                                <Dropdown>
                                                    <Dropdown.Toggle as={CustomToggleButton}>
                                                    </Dropdown.Toggle>
                                                    <Dropdown.Menu >
                                                        <Dropdown.Item eventKey={activePost.postId} onClick={() => handleDeleteActivePost(activePost.postId)}>Delete</Dropdown.Item>
                                                        {activeButton == 1 && (<Dropdown.Item eventKey={ActiveCasesMenu.MarkResolve} onClick={() => handleMarkAsResolve(activePost.postId, PostStatus.Resolved)}>Mark Resolve</Dropdown.Item>)}
                                                        {activeButton == 2 && (<Dropdown.Item eventKey={ActiveCasesMenu.MarkResolve} onClick={() => handleMarkAsResolve(activePost.postId, PostStatus.Unresolved)}>Mark Unresolve</Dropdown.Item>)}

                                                    </Dropdown.Menu>
                                                </Dropdown>
                                            }

                                            {handleContactModal && <div >
                                                <Button onClick={() => handleContactModal(activePost)} variant="outline-secondary" size="sm">Contact</Button>
                                            </div>}
                                        </div>
                                    </div>


                                    <div className="d-flex align-items-center justify-content-end ">
                                        <div className="d-flex align-items-center justify-content-center">

                                            <strong>{new Date(activePost.date).toDateString()}</strong>
                                        </div>
                                        <div className="ms-2 me-1">{'|'}</div>
                                        <div className="d-flex align-items-center justify-content-center">
                                            <LocationIcon height={"20px"} width={"20px"}></LocationIcon>
                                            <strong>{activePost.city}</strong>
                                        </div>

                                    </div>
                                </Col>
                            </Row>
                        </Container>)
                    )
                }

            </div>
        </div >

    );
}


export default AddTable;
