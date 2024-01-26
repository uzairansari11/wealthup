import React from "react";

const ButtonComponent = ({ title, className, onClick }) => {
  return (
    <button className={className} onClick={onClick}>
      {title}
    </button>
  );
};

export default ButtonComponent;
