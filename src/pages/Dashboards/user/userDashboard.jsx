import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../sections/NavBar";
import { Card } from "react-bootstrap";
import Footer from "../../../sections/Footer";
import { Container, Row, Col } from "react-bootstrap";
import { VerticalBar } from "../Report/VerticalBar";
import PostCountReport from "../Report/postCountReport";
import IfDoughnut from "../Report/ifDoughnut";
import { GetDashboardStats } from "../../../services/ActiveCasesService";
import useTokenValidate from './../../../services/validateTokenHook.js';
import { Box, LinearProgress } from "@mui/material";
import MFooter from "../../../sections/MaterialFooter/MFooter";

function UserDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("x_auth_token");

  const [validate, setValidate] = useState("");
  const [personStats, setPersonStats] = useState({
    "PostCountReport": {
      "totalLostPosts": 0,
      "totalFoundPosts": 0,
      "totalResolved": 0,
      "totalUnResolved": 0,
    },
    "Doughnut": [
      0, 0, 0, 0
    ]
  });

  useEffect(() => {
    const validate = async () => {

      GetDashboardStats().then(response => {
        setValidate("true");
        console.log("GetDashboardStats: ", response);
        const { allActiveFoundPostCount,
          allActiveLostPostCount,
          allResolvedPostCount,
          allUnResolvedPostCount,
          userActiveFoundCasesCount,
          userActiveLostCasesCount,
          userResolvedCasesCount,
          userUnresolvedCasesCount,
        } = response.data;

        const doughnutArr = [userActiveLostCasesCount, userActiveFoundCasesCount, userUnresolvedCasesCount, userResolvedCasesCount];
        const postCountObj = {
          totalLostPosts: allActiveLostPostCount,
          totalFoundPosts: allActiveFoundPostCount,
          totalResolved: allResolvedPostCount,
          totalUnResolved: 1,
        }
        setPersonStats(prevArray => {
          const newObj = { ...prevArray };
          newObj.Doughnut = doughnutArr;
          newObj.PostCountReport = postCountObj;
          return newObj;
        });
      }).catch(err => {
        debugger;
        console.log(err);
      }).finally(() => setLoading(false));

    };
    setLoading(true);
    validate();
  }, []);

  if (loading)
    return (<div>
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
        <h3>Loading..</h3>
      </Box>
    </div>
    )
  else {
    return (
      validate === "true" && (
        <div>
          <NavBar currentUser={localStorage.getItem("email")} />
          <Container className="bg-white" style={{ marginTop: "2rem", minHeight: "80vh" }} >
            <div className="mt-2 mb-2">
              <PostCountReport
                heading={"Person"}
                totalLostPosts={personStats.PostCountReport.totalLostPosts}
                totalFoundPosts={personStats.PostCountReport.totalFoundPosts}
                totalResolved={personStats.PostCountReport.totalResolved}
                totalUnResolved={personStats.PostCountReport.totalUnResolved}
              />
            </div>

            <Row className="mt-5 mb-2" >
              <Col md={8} style={{ minHeight: '250px' }} >
                <VerticalBar />
              </Col>
              <Col md={4} style={{ minHeight: '250px' }}>

                <IfDoughnut
                  row={personStats.Doughnut}
                />
              </Col>
            </Row>

          </Container>
          <MFooter />
        </div >
      )
    );
  }



}

export default UserDashboard;
