import React from "react";

const ShowText = ({ frontText, text }) => {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "0.5rem 0.5rem",
        background: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        display: "flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      {frontText && (
        <p
          style={{
            margin: "0",
            fontSize: "18px",
            color: "#333",
            fontWeight: "bold",
          }}
        >
          {frontText}
        </p>
      )}
      <p
        style={{
          margin: "0",
          fontSize: "22px",
          color: "#007bff",
          letterSpacing: "2px",
        }}
      >
        {text}
      </p>
    </div>
  );
};

export default ShowText;
