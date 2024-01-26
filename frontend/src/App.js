import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.css";
import ButtonComponent from "./components/ButtonComponent";
import ShowText from "./components/ShowText";

function App() {
  const [code, setCode] = useState("");
  const [inputText, setInputText] = useState("");
  const [inputMessage, setInputMessage] = useState("");
  const [clicked, setClicked] = useState({
    refreshed: false,
    submitted: false,
  });
  const [error, setError] = useState(false);
  const timerID = useRef(null);
  const handleInputTextDefault = () => {
    setInputMessage("");
  };

  const handleGenerateCode = async () => {
    setClicked({ ...clicked, refreshed: true });
    try {
      const res = await axios.get(`${process.env.REACT_APP_URI}/code`);
      setCode(res.data.code);
    } catch (error) {
      alert("Error", error);
    } finally {
      setClicked({ ...clicked, refreshed: false });
    }
  };
  console.log(clicked);
  const handleSubmitCode = async () => {
    if (inputText.trim() === "") {
      return alert("Please Enter Code!");
    }
    setClicked({ ...clicked, submitted: true });
    clearTimeout(timerID.current);
    try {
      const res = await axios.post(`${process.env.REACT_APP_URI}/code`, {
        code: inputText,
      });
      setInputMessage(res.data.message);

      setError(false);
    } catch (error) {
      setError(true);
      setInputMessage(error.response.data.error);
    } finally {
      timerID.current = setTimeout(handleInputTextDefault, 2000);
      setInputText("");
      setClicked({ ...clicked, submitted: false });
    }
  };
  useEffect(() => {
    handleGenerateCode();
    return () => clearTimeout(timerID.current);
  }, []);
  return (
    <div>
      <h3 className="main-heading-app">Code Generation and Validation App</h3>

      {/* Showing Code Value with Refresh Button */}
      <div className="code-value-container">
        <ShowText
          frontText={"Your Code Is : "}
          text={code ? code : "..loading"}
        />

        <ButtonComponent
          title={clicked.refreshed ? "Generating" : "Refresh"}
          className={"button-primary-style"}
          onClick={handleGenerateCode}
          disabled={clicked.refreshed}
        />
      </div>

      {/* Showing Input and Validation Button */}
      <div className="code-value-container">
        <input
          type="text"
          placeholder="Please enter code"
          className="input-tag-code"
          value={inputText}
          onChange={(e) => setInputText(e.target.value.trim())}
        />
        <ButtonComponent
          title={clicked.submitted ? "Submitted" : "Submit"}
          className={"button-primary-style"}
          onClick={handleSubmitCode}
          disabled={clicked.submitted}
        />
      </div>
      <div className="code-value-container" style={{ marginTop: "5px" }}>
        <p style={{ textAlign: "left", color: `${error ? "red" : "green"}` }}>
          {inputMessage}
        </p>
      </div>
    </div>
  );
}

export default App;
