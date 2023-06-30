import {Link } from "react-router-dom";
import "../styles/navbar.css";
import * as FaIcons from "react-icons/fa";
import React, { useState } from "react";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import { FaUserAlt } from "react-icons/fa";
import ifLogo from "../Images/image";
import "./NavBar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { PostStatus } from "../Enums/Enums";
import {RiParentFill} from "react-icons/ri";
import {FaSadCry} from "react-icons/fa";
import CreateIcon from "../components/Svgs/createIcon";

function NavBar(props) {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogout = () => {
     
    localStorage.clear();
  };
  return (
    <React.Fragment>
      <div>
        <Navbar
          collapseOnSelect
          className="h-auto"
          expand="lg"
          bg="dark"
          variant="dark"
        >
          <nav
            style={{ zIndex: "10" }}
            className={sidebar ? "nav-menu active" : "nav-menu"}
          >
            <ul className="pl-0 bg-white">
              <li className="navbar-toggle">
                <Link onClick={showSidebar} className="menu-bars">
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>

              {SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName + " border-bottom"}>
                    <Link to={item.path}>
                      {item.icon}
                      <span>{item.title}</span>
                    </Link>
                  </li>
                );
              })}
              <li className={"nav-text border-bottom"}>
                <Link>
                  <FaSadCry />
                  <NavDropdown
                    title="Match Lost Cases"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item
                      as={Link}
                      to={`/lostMatchCases/${PostStatus.Unresolved}`}
                    >
                      Person Cases
                    </NavDropdown.Item>
                  </NavDropdown>
                </Link>
              </li>
              <li className={"nav-text border-bottom"}>
                <Link>
                  <div>
                    <RiParentFill />
                  </div>
                  <NavDropdown title="Match Found Cases" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to={`/foundMatchCases/${PostStatus.Unresolved}`}>Person Cases</NavDropdown.Item>
                  </NavDropdown>
                </Link>
              </li>
              <li className={"nav-text"}>
                <Link>
                  <CreateIcon height={18} width={18}/>
                  <NavDropdown
                    title="Create New Case"
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/uploadLostPerson">
                      Create Person Case
                    </NavDropdown.Item>
                  </NavDropdown>
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            {localStorage.getItem("email") && (
              <Link to="#" className="menu-bars">
                <FaIcons.FaBars onClick={showSidebar} />
              </Link>
            )}
          </div>
          <Container style={{ minHeight: "4rem" }}>
            <Navbar.Brand as={Link} to="/">
              <img
                src={ifLogo}
                alt="logo"
                style={{
                  height: "2rem",
                  width: "6rem",
                }}
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto gap-3">
                {/* <Nav.Link as={Link} to="/user-dashboard">
                  Dashboard
                </Nav.Link> */}
                <NavDropdown
                  title="All Person List"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item as={Link} to="/Lost-List">
                    Lost Person List
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    className="border-top"
                    as={Link}
                    to="/Found-List"
                  >
                    Found Person List
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav>
                {!props.currentUser && (
                  <Nav.Link onClick={handleLogout} href="/Login">
                    {" "}
                    Login
                  </Nav.Link>
                )}

                {props.currentUser && (
                  <NavDropdown
                    title={<FaUserAlt />}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item>
                      <div className="d-flex gap-1 align-items-center">
                        <div>
                          <FaUserAlt />
                        </div>
                        {localStorage.getItem("name")}
                      </div>
                    </NavDropdown.Item>

                    {/* <NavDropdown.Item className="border-top ">
                      {" "}
                      Edit Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item className="border-top">
                      {" "}
                      Privacy
                    </NavDropdown.Item> */}
                    <NavDropdown.Item
                      className="border-top"
                      onClick={handleLogout}
                      href="/Login"
                    >
                      {" "}
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                )}

                {/* {props.currentUser && (
                  <Nav.Link onClick={handleLogout} href="/Login">Logout</Nav.Link>
                )} */}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
    </React.Fragment>

  );
}

export default NavBar;
