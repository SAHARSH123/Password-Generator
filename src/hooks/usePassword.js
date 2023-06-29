import { useState } from "react";

const usePassword = () => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [strength, setStrength] = useState("");
  const generatePassword = (
    passLength,
    includeUpper,
    includeLower,
    includeSymbol,
    includeNum
  ) => {
    const options = [];
    if (includeUpper) options.push("U");
    if (includeLower) options.push("L");
    if (includeSymbol) options.push("S");
    if (includeNum) options.push("N");
    let password = "";
    for (let index = 0; index < passLength; index++) {
      let curOption = Math.floor(Math.random() * options.length);

      if (options[curOption] === "U") {
        let charIndex = Math.floor(Math.random() * 26);
        let asciiVal = 65 + charIndex;
        password = password + String.fromCharCode(asciiVal);
      }

      if (options[curOption] === "L") {
        let charIndex = Math.floor(Math.random() * 26);
        let asciiVal = 97 + charIndex;
        password = password + String.fromCharCode(asciiVal);
      }

      if (options[curOption] === "N") {
        let charIndex = Math.floor(Math.random() * 10);
        password = password + charIndex;
      }

      if (options[curOption] === "S") {
        let SYMBOLS = "!@#$%^&*()+{}><?";
        let charIndex = Math.floor(Math.random() * 16);
        password = password + SYMBOLS[charIndex];
      }
    }

    if (password) {
      if (error) {
        setError("");
      }
      setPassword(password);
      if (password.length <= 4) {
        setStrength("Weak");
      }

      if (password.length > 4 && password.length <= 8) {
        setStrength("Medium");
      }

      if (password.length > 8) {
        setStrength("Strong");
      }
    } else {
      setPassword("");
      setStrength("");
      setError("Please select options");
    }
  };

  return [password, error, generatePassword, strength];
};

export default usePassword;
