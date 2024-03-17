import React, { useRef, useState, useEffect } from "react";

export default function Nationality() {
  let [name, setName] = useState("");
  let [error, setError] = useState(null);
  let [countryDetails, setCountryDetails] = useState(null);
  let inputRef = useRef(null);

  useEffect(() => {
    // Focus the input field on mount
    inputRef.current.focus();
  }, []);

  // the handleUserInput function is called when user enter a input on the inputfield,
  //the input is passed on the function and the setName function update the name state
  let handleUserInput = (input) => {
    setName(input);
  };

  // fetchData stores the async function which is used to fetch data from the nationalize.io API
  //based on the name the user entered and setCountryDetails  with the 1st object from the country array
  let fetchData = async () => {
    try {
      const response = await fetch(`https://api.nationalize.io?name=${name}`);
      const data = await response.json();
      if (data.country && data.country.length > 0) {
        setCountryDetails(data.country[0]);
        setError(null);
      } else {
        setCountryDetails(null);
        setError("Name not found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    }
  };

  // when name has been entered and user clicks the submit button handleButtonClick is called
  let handleButtonClick = () => {
    fetchData();
  };

  let handleInputClick = () => {
    // Reset countryDetails when the input field is clicked
    setCountryDetails(null);
    setError(null);
  };

  return (
    <div className="App">
      <h1>Nationality by Name</h1>
      <input
        type="text"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => handleUserInput(e.target.value)}
        ref={inputRef}
        onClick={handleInputClick}
      />
      <button onClick={handleButtonClick}>Submit</button>
      {countryDetails && (
        <div>
          <h2>Result:</h2>
          <p>
            <span>{name}</span> there is a probability of {(countryDetails.probability * 100).toFixed(2)}% that you are from { countryDetails.country_id}
          </p>
        </div>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
