import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { DatePicker } from "rsuite";
import IfPersonList from "./low-level/ifPersonList";
import SearchEvent from "../../components/SearchEvent/SearchEvent";
import RangeInput from "../../components/RangeInput/rangeInput";
import DropDown from "../../components/DropDown";
import NavBar from "../../sections/NavBar";
import './personPage.css';
import { COLORS } from "../../styles/globalColors";
import { GenderType } from "../../Enums/Enums";
import { cities } from "../../static/static";
import { DeleteActivePost } from "../../services/ActiveCasesService";
import Footer from "../../sections/Footer";
import { MapGeneralPersonList } from "./low-level/helperServices/PersonMap";
import { RoleClaim } from "../../AspNetClaims";


const PersonPage = ({ url, toast }) => {
  const navigate = useNavigate();

  const [filterInput, setFilterInput] = useState({
    rangeInput: {
      min: "",
      max: "",
    },
    selectedDate: "",
    selectedGender: Object.values(GenderType)[0],
    selectedState: cities[0]

  });

  const [loading, setLoading] = useState(true);
  // const [PersonPosts, setPersonPosts] = useState([]);
  const [posts, setPosts] = useState({
    personPosts: [],
    filteredPosts: []
  })

  const [permissions, setPermissions] = useState({
    deletePermission: false
  })

  useEffect(() => {
    const getPersonPostData = async () => {
      const token = localStorage.getItem("x_auth_token");

      try {
        const { data } = await axios.get(
          url, { headers: { Authorization: `Bearer ${token}` } }
        );
        const posts = MapGeneralPersonList(data);
        setPosts({ filteredPosts: posts, personPosts: posts });
        setLoading(false);
      } catch (err) {
        // const description = err.toString();
        // navigate("/error", { state: { description } });
      }
    };

    const validate = async () => {
      try{
        const token = localStorage.getItem("x_auth_token");
        const tokenData = jwtDecode(token);
        const userType = tokenData[RoleClaim];
  
        if (userType === "Admin")
          setPermissions({ deletePermission: true })
      }catch(err)
      {
        debugger;
        console.log(err);
      }
      
    };

    getPersonPostData();
    validate();
  }, [url]);


  const handleDeleteActivePost = (postId) => {

    // Handle option change event
    DeleteActivePost(postId).then(_response => {
      const filteredPosts = posts.filteredPosts.filter(post => post.postId !== postId);
      setPosts({ ...posts, filteredPosts });
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request successful" });
      toast.setShow(true);
    }).catch(error => {
      console.error('DELETE request failed:', error);
      toast.setToastMessage({ headerText: "Active Case", bodyText: "DELETE request failed" });
      toast.setShow(true);
    });
  }

  const handleDateChange = (date) => {
    setFilterInput({ ...filterInput, selectedDate: date });

    const filteredPosts = posts.personPosts.filter(x => {
      if (!date) return posts.personPosts;
      if (x.date) {
        const serverDateObj = new Date(x.date);
        const dateObj = new Date(date);
        if (serverDateObj.getFullYear() > dateObj.getFullYear()) {
          return x;
        }
        else if (serverDateObj.getFullYear() === dateObj.getFullYear()) {
          if (serverDateObj.getMonth() > dateObj.getMonth()) {
            return x;
          }
          else if (serverDateObj.getMonth() === dateObj.getMonth()) {
            if (serverDateObj.getDate() > dateObj.getDate()) {
              return x;
            }
            else if (serverDateObj.getDate() === dateObj.getDate()) {
              return x;
            }
          }
        }
      }
    });
    setPosts({ ...posts, filteredPosts });
    console.log("Filtered Posts \"From\": ", filteredPosts);

  };

  const onSearchClick = (state, setIsOpen) => {
    setFilterInput({ ...filterInput, selectedState: state });
    setIsOpen(false);
    if (state === "Select None") {
      setPosts({ ...posts, filteredPosts: posts.personPosts });
      return;
    }
    const filteredPosts = posts.personPosts.filter(post => {
      return post.city === state;
    });
    setPosts({ ...posts, filteredPosts });
  }

  const handleGenderChange = (gender) => {
    setFilterInput({ ...filterInput, selectedGender: gender });
    const filteredPosts = posts.personPosts.filter(post => post.gender === gender);
    setPosts({ ...posts, filteredPosts });
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

  const handleAgeGoClick = () => {
    const { rangeInput } = filterInput;
    if (!rangeInput.min || !rangeInput.max) {
      setPosts({ ...posts, filteredPosts: posts.personPosts });
      return;
    }
    if (!isNaN(+rangeInput.min) && !isNaN(+rangeInput.max)) {
      const filteredPosts = posts.personPosts.filter(post => post.age >= rangeInput.min && post.age <= rangeInput.max);
      setPosts({
        ...posts,
        filteredPosts
      });
    }
  }

  // const screenHeight = window.innerHeight;
  return (
    <React.Fragment>
      <NavBar currentUser={localStorage.getItem("email")} />
      {/* <h1 className="App-header">Lost List</h1> */}
      <div className="MainContent">
        <div className="d-flex align-items-center justify-content-around FilterStyle">

          <SearchEvent onSearchClick={onSearchClick} />
          <RangeInput
            label={"Age"}
            minValue={filterInput.rangeInput.min}
            maxValue={filterInput.rangeInput.max}
            handleMinChange={handleMinAgeChange}
            handleMaxChange={handleMaxAgeChange}
            handleGoClick={handleAgeGoClick}></RangeInput>
          <DropDown list={Object.keys(GenderType)} label="Gender" dropDownChange={handleGenderChange} />
          <div id="start-date">
            <label class="fs-6 me-1" style={{ color: COLORS.ifSpanColor }}>From</label>
            <DatePicker onChange={handleDateChange} format="yyyy-MM-dd" />
          </div>
          <div id="start-date">
            <label class="fs-6 me-1" style={{ color: COLORS.ifSpanColor }}>To</label>
            <DatePicker onChange={handleDateChange} format="yyyy-MM-dd" />
          </div>
        </div>
        <IfPersonList
          PersonPosts={posts.filteredPosts}
          loading={loading}
          recordsPerPage={4}
          deletePermission={permissions.deletePermission}
          handleDeleteActivePost={handleDeleteActivePost}
        />
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default PersonPage;
