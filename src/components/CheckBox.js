import React from "react";
const CheckBox = ({ label, value, handleChange, id }) => {
  return (
    <div>
      <label>
        <input
          type="checkbox"
          onChange={() => handleChange(id)}
          checked={value}
        />
        {label}
      </label>
    </div>
  );
};

export default CheckBox;
