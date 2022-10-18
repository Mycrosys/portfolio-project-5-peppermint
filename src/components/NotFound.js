import React from "react";
import NoResults from "../assets/no-results.png";
import styles from "../styles/NotFound.module.css";
import Asset from "./Asset";

// This will show a message when the User navigates
// to an invalid link by typing it in the address bar

const NotFound = () => {
  return (
    <div className={styles.NotFound}>
      <Asset
        src={NoResults}
        message={`Sorry, this page does not exist.`}
      />
    </div>
  );
};

export default NotFound;
