import React from "react";

const ButtonComponent = ({ title, className, onClick, disabled }) => {
  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {title}
    </button>
  );
};

export default ButtonComponent;
