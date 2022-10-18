import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";

import logo from "../assets/peplogo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { 
  useCurrentUser,
  useSetCurrentUser
} from "../contexts/CurrentUserContext";

import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";
import { removeTokenTimestamp } from "../utils/utils";

// This is used to create and display the Navbar on top of the Page

const NavBar = () => {
  // current User
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  // custom hook for closing navbar on click (mobile/burger icon)
  const { expanded, setExpanded, ref } = useClickOutsideToggle();
  
  // Signout function
  const handleSignOut = async () => {
    try {
      await axios.post("dj-rest-auth/logout/");
      setCurrentUser(null);
      removeTokenTimestamp();
    } catch (err) {
      console.log(err);
    }
  };

  // Icon to add an Issue (Create Bug Report)
  const addIssueIcon = (
    <NavLink
      className={styles.NavLink}
      activeClassName={styles.Active}
      to="/issues/create">
      <i className="fas fa-solid fa-bug"></i>Report
    </NavLink>
  );

  // display when authenticated
  // My Issues, Followed, Sign Out and Avatar/Username
  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/myissues">
        <i className="fas fa-clipboard-list"></i>My&nbsp;Issues
      </NavLink>
      
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/followed">
        <i className="fas fa-walking"></i>Followed
      </NavLink>
      
      <NavLink className={styles.NavLink} to="/" onClick={handleSignOut}>
        <i className="fas fa-sign-out-alt"></i>Logout
      </NavLink>
      
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar 
          src={currentUser?.profile_image}
          text={currentUser?.username}
          height={40} />
      </NavLink>
    </>
  );
  
  // display login / register (not authenticated)
  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin">
        <i className="fas fa-sign-in-alt"></i>Login
      </NavLink>

      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}>
        <i className="fas fa-user-plus"></i>Register
      </NavLink>
    </>
  );

  return (
    <Navbar
      className={styles.NavBar}
      expand="md"
      fixed="top"
      expanded={expanded}> 
      <Container>
        <NavLink to="/">
          <Navbar.Brand>
            <img src={logo} alt="logo" height="50" />
          </Navbar.Brand>
        </NavLink>
        {currentUser && addIssueIcon}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          ref={ref}
          onClick={() => setExpanded(!expanded)}/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto text-left">
            <NavLink exact
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/">
              <i className="fas fa-home"></i>Home
            </NavLink>
            
            {currentUser ? loggedInIcons : loggedOutIcons}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;