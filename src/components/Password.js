import React, { useState } from "react";
// import { generatePassword } from "../common/utils";
import CheckBox from "./CheckBox";
import "./Password.css";
import copy from "copy-to-clipboard";
import usePassword from "../hooks/usePassword";

const Password = () => {
  const [inputValue, setInutValue] = useState(4);
  const [formData, setFormData] = useState([
    { label: "Include uppercase Letters", value: false },
    { label: "Include lowercase Letters", value: false },
    { label: "Include Symbols", value: false },
    { label: "Include Number", value: false },
  ]);
  const [copyText, setCopyText] = useState("Copy");

  const [password, error, generatePassword, strength] = usePassword();

  const handleRangeChange = (e) => {
    let value = e.target.value;
    setInutValue(value);
  };

  const handleCopy = () => {
    copy(password);
    setCopyText("Copied");
  };

  const handleSubmit = () => {
    generatePassword(
      inputValue,
      formData[0].value,
      formData[1].value,
      formData[2].value,
      formData[3].value
    );

    setCopyText("Copy");
  };

  const handleCheckBoxChange = (e, index) => {
    const oldStateValue = formData[index].value;
    const newState = { ...formData[index], value: !oldStateValue };
    const newArray = [];
    for (let curIndex = 0; curIndex < formData.length; curIndex++) {
      if (curIndex === index) {
        newArray.push(newState);
      } else {
        newArray.push(formData[curIndex]);
      }
    }
    setFormData(newArray);
  };

  return (
    <div className="container">
      <div className="heading">Generate Password</div>
      {password && (
        <div className="upperHeader">
          <div>{password}</div>
          <button className="copy-btn" onClick={handleCopy}>
            {copyText}
          </button>
        </div>
      )}
      <div className="rangeInput">
        <div>Character Length {inputValue}</div>
        <input
          className="slider-width"
          type="range"
          min="1"
          max="12"
          value={inputValue}
          onChange={handleRangeChange}
        />
      </div>

      <div className="checkBoxComponent">
        {formData.map((data, index) => {
          return (
            <CheckBox
              key={data.label}
              id={index}
              label={data.label}
              value={data.value}
              handleChange={(e) => handleCheckBoxChange(e, index)}
            />
          );
        })}
      </div>

      {error && <div className="error-container">{error}</div>}
      {strength && password && (
        <div className="strength-container">
          <div>Strength</div>
          <div>{strength}</div>
        </div>
      )}

      <div className="submit-btn" onClick={handleSubmit}>
        Generate Password
      </div>
    </div>
  );
};

export default Password;
