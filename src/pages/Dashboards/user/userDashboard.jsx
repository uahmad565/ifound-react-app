import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../../../sections/NavBar";
import { Card } from "react-bootstrap";
import Footer from "../../../sections/Footer";
import { Container, Row } from "react-bootstrap";
import { VerticalBar } from "../Report/VerticalBar";
import PostCountReport from "../Report/postCountReport";
import IfDoughnut from "../Report/ifDoughnut";
import { GetDashboardStats } from "../../../services/ActiveCasesService";
import useTokenValidate from "../../validateTokenHook";


function UserDashboard() {
  const navigate = useNavigate();

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
      }).catch(err=>{
        debugger;
        console.log(err);
      });

    };

    validate();
  }, []);

  return (
    validate === "true" && (
      <React.Fragment>
        <NavBar currentUser={localStorage.getItem("email")} />
        <Container style={{ marginTop: "2rem" }}>
          <div>
            <PostCountReport
              heading={"Person"}
              totalLostPosts={personStats.PostCountReport.totalLostPosts}
              totalFoundPosts={personStats.PostCountReport.totalFoundPosts}
              totalResolved={personStats.PostCountReport.totalResolved}
              totalUnResolved={personStats.PostCountReport.totalUnResolved}
            />
          </div>

          <div className="mt-2 mb-2">
            <Row >
              <Card style={{ width: '70%' }} >
                <VerticalBar />
              </Card>
              <Card style={{ width: '30%' }}>

                <IfDoughnut
                  row={personStats.Doughnut}
                />
              </Card>

            </Row>
          </div>

        </Container>
        <div style={{ minHeight: '10rem' }}>

        </div>
        <Footer />
      </React.Fragment >
    )
  );
}

export default UserDashboard;
