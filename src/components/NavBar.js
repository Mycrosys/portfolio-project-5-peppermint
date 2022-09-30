import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/peplogo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser } from "../contexts/CurrentUserContext";


const NavBar = () => {
  // current User
  const currentUser = useCurrentUser();

  // display Username (authenticated)
  const loggedInIcons = <>{currentUser?.username}</>;
  
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
    <Navbar className={styles.NavBar} expand="md" fixed="top">
      <Container>
        <NavLink to="/">
        <Navbar.Brand>
          <img src={logo} alt="logo" height="50" />
        </Navbar.Brand></NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
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