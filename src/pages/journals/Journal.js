import React from "react";
import Media from "react-bootstrap/Media";
import styles from "../../styles/Journal.module.css";

const Journal = (props) => {
  const { updated_at, description } = props;

  return (
    <div>
      <hr />
      <Media>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Time}>{updated_at}:</span>
          <p>
            <span>{description}</span>
          </p>
        </Media.Body>
      </Media>
    </div>
  );
};

export default Journal;