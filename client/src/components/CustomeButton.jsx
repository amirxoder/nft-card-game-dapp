import React from "react";
import styles from "../styles";

const CustomeButton = ({ title, handleClick, restStyles }) => {
  return (
    <button
      type="button"
      className={`${styles.btn} ${restStyles}`}
      onClick={handleClick}
    >
      {title }
    </button>
  );
};

export default CustomeButton;
