import React from "react";
import { useHistory } from "react-router";
import styles from "../styles/MoreDropdown.module.css";
import Dropdown from "react-bootstrap/Dropdown";

// This displays a Pen Icon with a dropdown
// menu for user interaction. A neat way to hide further
// actions while also keeping functionality.

const Anchor = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa fa-pencil"
    aria-hidden="true"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

// Dropdown for Issues (Edit and Delete)

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  return (
    <Dropdown className="ml-auto" drop="down">
      <Dropdown.Toggle as={Anchor} />

      <Dropdown.Menu
        className="text-center"
        popperConfig={{ strategy: "fixed" }}>
        
        <Dropdown.Item
          onClick={handleEdit}
          aria-label="edit">
          Edit
        </Dropdown.Item>

        <Dropdown.Item
          onClick={handleDelete}
          aria-label="delete">
          Delete
        </Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown>
  );
};

// Dropdown for Profiles (Edit and Delete)

export function ProfileEditDropdown({ id }) {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={Anchor} />
      
      <Dropdown.Menu>
        
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile">
          Edit Profile
        </Dropdown.Item>
        
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username">
          Change Username
        </Dropdown.Item>
        
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password">
          Change Password
        </Dropdown.Item>

      </Dropdown.Menu>
    
    </Dropdown>
  );
}