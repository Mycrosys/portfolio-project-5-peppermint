import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

// This is used to display a Pen Icon with a dropdown
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
