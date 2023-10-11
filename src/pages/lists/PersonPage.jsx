import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import useSWR from "swr";
import { Row, Col, Container, OverlayTrigger, Tooltip } from "react-bootstrap";
import { DatePicker, Input } from "rsuite";
import IfPersonList from "./low-level/ifPersonList";
import SearchEvent from "../../components/SearchEvent/SearchEvent";
import RangeInput from "../../components/RangeInput/rangeInput";
import DropDown from "../../components/DropDown";
import NavBar from "../../sections/NavBar";
import './personPage.scss';
import { COLORS } from "../../styles/globalColors";
import { GenderType } from "../../Enums/Enums";
import { cities } from "../../static/static";
import { DeleteActivePost } from "../../services/ActiveCasesService";
import Footer from "../../sections/Footer";
import { MapGeneralPersonList } from "./low-level/helperServices/PersonMap";
import { RoleClaim } from "../../AspNetClaims";
import { ReactComponent as InfoSvg } from '../../components/Svgs/information.svg';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MFooter from "../../sections/MaterialFooter/MFooter";
import { FilterLabel } from "../../components/filterLabel";


function fetchWithToken(url, token) {
  return axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(({ data }) => {
    const posts = MapGeneralPersonList(data);
    return posts;
  });
}

const PersonPage = ({ toast }) => {

  const location = useLocation();
  console.log(location.pathname);
  let url = "";
  if (location.pathname.toLowerCase() === "/lost-list".toLowerCase())
    url = `${process.env.REACT_APP_DOT_NET_API}api/home/getCurrentLostPosts`;
  else if (location.pathname.toLowerCase() === "/found-list".toLowerCase())
    url = `${process.env.REACT_APP_DOT_NET_API}api/home/getCurrentFoundPosts`;

  const [filterInput, setFilterInput] = useState({
    rangeInput: {
      min: "",
      max: "",
    },
    fromDate: "",
    toDate: "",
    selectedGender: Object.values(GenderType)[0],
    selectedState: cities[0],
    name: ""
  });

  const [filteredPosts, setPosts] = useState([])
  const [permissions, setPermissions] = useState({ deletePermission: false });
  const [filteredCities, setFilteredCities] = useState(cities);

  const token = localStorage.getItem("x_auth_token");
  const { data: postList, error: myEror, isLoading } = useSWR([url, token], ([url, token]) => fetchWithToken(url, token));

  console.log("SWR returned: ", postList, myEror);

  if (postList && filteredPosts.length == 0) {
    console.log("data");
    setPosts(postList);
  }

  //events
  const handleDeleteActivePost = (postId) => {

    // Handle option change event
    DeleteActivePost(postId).then(_response => {
      const filteredPosts = postList.filter(post => post.postId !== postId);
      setPosts(filteredPosts);
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request successful" });
      toast.setShow(true);
    }).catch(error => {
      console.error('DELETE request failed:', error);
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request failed" });
      toast.setShow(true);
    });
  }

  //cities 

  const handleSearchEvent = (e) => {
    setFilterInput({ ...filterInput, selectedState: e.target.value });
    const results = cities.filter((city) => {
      if (e.target.value === "") return cities;
      return city.toLowerCase().includes(e.target.value.toLowerCase());
    });

    setFilteredCities(results);
    console.log(results);
  };
  //
  const handleToDateChange = (date) => {
    setFilterInput({ ...filterInput, toDate: date.toISOString() });
  };

  const handleFromDateChange = (date) => {
    setFilterInput({ ...filterInput, fromDate: date.toISOString() });
  };

  const onSearchClick = (state, setIsOpen) => {
    setFilterInput({ ...filterInput, selectedState: state });
    setIsOpen(false);
  }

  const handleNameChange = (name) => {
    setFilterInput({ ...filterInput, name });
  }

  const handleGenderChange = (gender) => {
    setFilterInput({ ...filterInput, selectedGender: gender });
    const filteredPosts = postList.filter(post => post.gender === gender);
    setPosts(filteredPosts);
  }

  const handleMinAgeChange = (event) => {
    setFilterInput({
      ...filterInput, rangeInput: {
        ...filterInput.rangeInput, min: event.target.value
      }
    });
    console.log(event.target.value);
  }

  const handleMaxAgeChange = (event) => {
    setFilterInput({
      ...filterInput, rangeInput: {
        ...filterInput.rangeInput, max: event.target.value
      }
    });
  }


  const handleSubmitButton = () => {
    console.log("Submit Button Pressed", filterInput);
    let url = `${process.env.REACT_APP_DOT_NET_API}api/home/filterPosts`;
    const queryString = `City=${filterInput.selectedState}&Name=${filterInput.name}&MinAge=${filterInput.rangeInput.min}&MaxAge=${filterInput.rangeInput.max}&Gender=${filterInput.selectedGender}&FromDate=${filterInput.fromDate}&PageNo=${1}&PageSize=${10}`;
    url += "?" + queryString;
    axios.get(url, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
      console.log("Submit Button Response",response);
    }).catch(error => {
      debugger;
      console.log(error);
    });
  }

  const handleResetButton = () => {
    setFilterInput({
      rangeInput: {
        min: "",
        max: "",
      },
      fromDate: "",
      toDate: "",
      selectedGender: Object.values(GenderType)[0],
      selectedState: cities[0],
      name: ""
    });
  }

  return (
    <React.Fragment>
      <NavBar currentUser={localStorage.getItem("email")} />
      {/* <h1 className="App-header">Lost List</h1> */}
      <div style={{ minHeight: "70vh" }}>
        <Container className="mt-5 mb-5">
          <Row className="mb-3">
            <div className="d-flex justify-content-center">
              <p className="fs-2 text-black fw-bold">Search Missing/Found Children Posters</p>
            </div>
          </Row>
          <Row className="mb-1">
            <Col>
              <label class="fs-6 fw-bold me-1" style={{ color: COLORS.ifSpanColor }}>State: {" "}
                <OverlayTrigger placement="top" overlay={locationTooltip}>
                  <InfoSvg />
                </OverlayTrigger>
              </label>
              <SearchEvent
                onSearchClick={onSearchClick}
                inputValue={filterInput.selectedState}
                handleSearchEvent={handleSearchEvent}
                filteredList={filteredCities} />
            </Col>

          </Row>
          <Row style={{ rowGap: "1rem" }}>
            <Col sm className="m-auto">
              <FilterLabel label={'Name:'} />
              <Input className="name-input" onChange={handleNameChange} value={filterInput.name} />
            </Col>
            <Col xs sm className="m-auto">
              <RangeInput
                label={"Age:"}
                minValue={filterInput.rangeInput.min}
                maxValue={filterInput.rangeInput.max}
                handleMinChange={handleMinAgeChange}
                handleMaxChange={handleMaxAgeChange}
                toolTipMessage={"Age range of missing / found Person"}
              />
            </Col>
            <Col xs sm={3} lg={2} className="m-auto">
              <div>
                <FilterLabel label={'Gender:'} />
                <DropDown list={Object.keys(GenderType)} label="Gender" dropDownChange={handleGenderChange} />
              </div>
            </Col>
            <Col sm className="m-auto">
              <div className="d-flex flex-column justify-content-end">
                <div>
                  <label class="fs-6 text-black fw-bold me-1" style={{ color: COLORS.ifSpanColor }}>Date: {" "}
                    <OverlayTrigger placement="top" overlay={dateToolTip}>
                      <InfoSvg />
                    </OverlayTrigger>
                  </label>
                </div>
                <div className="mb-2" id="start-date">
                  <DatePicker onChange={handleFromDateChange} format="yyyy-MM-dd" />
                </div>
                <div id="end-date">
                  <DatePicker onChange={handleToDateChange} format="yyyy-MM-dd" />
                </div>
              </div>
            </Col>
            <Col sm className="m-auto">
              <div className="d-lg-flex flex-lg-column mt-lg-3">
                <button className="submit-btn m-1" onClick={handleSubmitButton}>Submit</button>
                <button className="submit-btn m-1" onClick={handleResetButton}>Reset</button>
              </div>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row>
            <p className="h5 search-result fw-bold">Search Results: 573</p>
          </Row>
          <IfPersonList
            PersonPosts={filteredPosts ? filteredPosts : []}
            loading={isLoading}
            recordsPerPage={6}
            deletePermission={permissions.deletePermission}
            handleDeleteActivePost={handleDeleteActivePost}
          />
        </Container>
      </div>
      <MFooter />
    </React.Fragment>
  );
};


const dateToolTip = (
  <Tooltip id="tooltip">
    <p className="fs-0 fw-light">Date Range when the Child went missing/found</p>
  </Tooltip>
);

const locationTooltip = (
  <Tooltip id="tooltip">
    <p className="fs-0 fw-light">Location where child went lost/found</p>
  </Tooltip>
);

export default PersonPage;
