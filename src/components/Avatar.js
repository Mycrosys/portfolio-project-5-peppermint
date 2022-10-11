import React from "react";
import styles from "../styles/Avatar.module.css";

// This is used to display the Avatar (profile pictures)
// where necessary

const Avatar = ({ src, height = 50, text }) => {
  return (
    <span>
      <img
        className={styles.Avatar}
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;