import { Container, Row, Col, Image } from "react-bootstrap"
import { TargetType } from "../../../Enums/Enums";
import { useEffect } from "react";
import { Link } from "react-router-dom";



export function PersonDescription({ postDetail }) {
    useEffect(() => {
        console.log('Test Component mounted or route changed');
        // Perform any necessary actions or fetch data here

        return () => {
            console.log('Test Cleaning Component unmounted or route changed');
            // Clean up any resources or subscriptions here
        };
    }, []);

    const { postId, name, age, city, details, image, date, gender, targetType, founderName, phone, fatherName } = postDetail;

    let detail = [
        {
            name: "Name:",
            value: name
        },
        {
            name: "Age:",
            value: age
        }, {
            name: "State:",
            value: city
        }, {
            name: "Date:",
            value: date
        }, {
            name: "Gender:",
            value: gender
        }, {
            name: "Post Type:",
            value: Object.keys(TargetType)[targetType - 1]?.toString()
        }, {
            name: "Created By:",
            value: founderName
        }, {
            name: "Phone:",
            value: phone
        }, {
            name: "Detail:",
            value: details
        }
    ];

    return (
        <Container className="bg-white p-4 border border-secondary">
            <Row>

                <p className="h1">Person Detail</p>
            </Row>
            <Row>
                <Col sm >
                    <Image src={"data:image/jpg;base64," + image} fluid rounded thumbnail></Image>
                </Col>
                <Col sm={7} lg={8} className="m-auto">
                    <Container className="m-0 bg-white">
                        {
                            detail.map((det, index) => (
                                <Row className="border border-secondary pt-2 pb-2" key={index}>
                                    <Col sm>
                                        <p className="h4 fw-bold">
                                            {det.name}
                                        </p>
                                    </Col>
                                    <Col sm={8}>
                                        <p className="h5 fw-light fst-italic">{det.value}</p>
                                    </Col>
                                </Row>))
                        }

                    </Container>
                </Col>
            </Row>
        </Container>
    )
}