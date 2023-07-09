import "./App.css";
import React, { useState, Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import NotFound from "./pages/common/NotFound";
import Home from "./pages/common/Home";

import Contactus from "./pages/forms/ContactUs";
import LogIn from "./pages/forms/login";
import SignUpForm from "./pages/forms/Signup";

import PersonDetail from "./pages/details/PersonDetail";
import UserDashboard from "./pages/Dashboards/user/userDashboard";
import PremiumUserDashboard from "./pages/Dashboards/premium_user/premiumUserDashboard";
import PoliceDashboard from "./pages/Dashboards/police/policeDashboard";
import AdminDashboard from "./pages/Dashboards/admin/adminDashboard";
import ResolvedCases from "./pages/Dashboards/user/reolvedCases";
import LoadingPage from "./pages/forms/LoadingPage";
import { TargetType } from "./Enums/Enums";
import MatchCases from "./pages/Dashboards/user/MatchPersonPosts/MatchCases";
import SearchPost from "./pages/Dashboards/user/SearchPost/searchPost";
import ShowToast from "./components/PopUps/showToast";
import ErrorPage from "./pages/common/ErrorPage/ErrorPage";
import { CustomRouter } from "./customRouter/customRouter";
import customHistory from "./customRouter/customHistory";
import { PersonForm } from "./pages/forms/personForm/PersonForm";
import { PersonDescription } from "./pages/forms/personDescription/PersonDescription";
import ErrorBoundary from "./core/ErrorBoundary";

//lazy loading components
const PersonPage = React.lazy(() => import('./pages/lists/PersonPage'));

function AppRoutes() {
  const [show, setShow] = useState(false);
  const [toastMessage, setToastMessage] = useState({
    headerText: "",
    bodyText: ""
  });



  return (
    <React.Fragment>
      <Routes>

        <Route path="/" element={<Home />}></Route>
        <Route path="/test" element={<PersonDescription />}></Route>
        {/* <Route path="/uploadPerson/:postType(^[1-2]$)" element={<PersonForm />}></Route> */}
        <Route path="/uploadPerson/:postType" element={<PersonForm />}></Route>


        <Route path="/Home" element={<Home />}></Route>
        <Route path="/Found-List" element={
          <Suspense fallback={<div>Loading...</div>}>
            <PersonPage
              url={`${process.env.REACT_APP_DOT_NET_API}api/home/getCurrentFoundPosts`}
              toast={{ setToastMessage, setShow }}
            />
          </Suspense>

        }>
        </Route>
        <Route path="/Lost-List" element={
          <ErrorBoundary>
            <Suspense>
              <PersonPage
                url={`${process.env.REACT_APP_DOT_NET_API}api/home/getCurrentLostPosts`}
                toast={{ setToastMessage, setShow }}
              />
            </Suspense>
          </ErrorBoundary>
        }>
        </Route>
        <Route path="/Contact-Us" element={<Contactus />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUpForm />}></Route>

        <Route path="/Person-Details/:id" element={<PersonDetail />}></Route>
        <Route path="/searchPost/:id/:postType" element={<SearchPost />}></Route>

        <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
        <Route path="/user-dashboard" element={<UserDashboard />}></Route>
        <Route path="/resolved-cases" element={<ResolvedCases />}></Route>
        <Route path="/lostMatchCases/:postStatus" element={<MatchCases postType={TargetType.LOST} toast={{ setToastMessage, setShow }} />}></Route>
        <Route path="/foundMatchCases/:postStatus" element={<MatchCases postType={TargetType.FOUND} toast={{ setToastMessage, setShow }} />}></Route>
        <Route path="/notFound" element={<NotFound />}></Route>
        <Route path="/error" element={<ErrorPage />}></Route>
        <Route
          path="/premium-user-dashboard"
          element={<PremiumUserDashboard />}
        ></Route>
        <Route path="/police-dashboard" element={<PoliceDashboard />}></Route>
        <Route path="/LoadingPage" element={<LoadingPage />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
      <ShowToast setShow={setShow} show={show} headerText={toastMessage.headerText} bodyText={toastMessage.bodyText} />
    </React.Fragment>
  );
}

function App() {
  return (
    <React.Fragment>
      <AppRoutes />
    </React.Fragment>
  );
}

function Wrapper() {

  return (

    <CustomRouter history={customHistory}>
      <App />
    </CustomRouter>
  );
}

export default Wrapper;
