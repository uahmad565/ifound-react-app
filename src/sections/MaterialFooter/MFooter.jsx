import React from "react";
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

function MFooter(props) {
    return (
        <React.Fragment>
            <MDBFooter bgColor='none' style={{ backgroundColor: "rgb(31 31 82)" }} className='text-center text-lg-start text-muted'>
                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom text-white'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon icon="facebook-f" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon icon="twitter" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon icon="google" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon icon="instagram" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon icon="linkedin" />
                        </a>
                        <a href='' className='me-4 text-reset'>
                            <MDBIcon icon="github" />
                        </a>
                    </div>
                </section>

                <section className='text-white'>
                    <MDBContainer className='text-center text-md-start mt-5'>
                        <MDBRow className='mt-3'>
                            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>
                                    <MDBIcon icon="" className="me-3" />
                                    IFound
                                </h6>
                                <p>
                                    Find Lost Found People with the help of Face Matching or by advanced filters. 
                                    Lost Children, Old People, Mentally unstable people are our target. 
                                    Help us to find these people by posting.
                                </p>
                            </MDBCol>

                            {/* <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Angular
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        React
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Vue
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Laravel
                                    </a>
                                </p>
                            </MDBCol> */}

                            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Face Matching
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Create Found Person
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Create Lost Person
                                    </a>
                                </p>
                                <p>
                                    <a href='#!' className='text-reset'>
                                        Search Person
                                    </a>
                                </p>
                            </MDBCol>

                            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
                                <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
                                <p>
                                    <MDBIcon icon="home" className="me-2" />
                                   {"  "} Township Lahore, Pj Pakistan
                                </p>
                                <p>
                                    <MDBIcon icon="envelope" className="me-3" />
                                    uahmad565565@example.com
                                </p>
                                <p>
                                    <MDBIcon icon="phone" className="me-3" /> +923076331854
                                </p>
                                <p>
                                    <MDBIcon icon="print" className="me-3" /> +923016335810
                                </p>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>

                <div className='text-center p-4 text-white' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                    © 2021 Copyright:
                    <a className='text-reset fw-bold' href={`${process.env.REACT_APP_COPYRIGHT_WEBSITE}`}>
                        {" "}Kabeer565
                    </a>
                </div>
            </MDBFooter>
        </React.Fragment>
    );
}

export default MFooter;
