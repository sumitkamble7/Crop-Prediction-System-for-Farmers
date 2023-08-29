import axios from "axios";
import { useState } from "react";
import logo from './skn.png'

import "./App.css";

function App() {
  const [userInput, setUserInput] = useState({});
  const [predictedCrop, setPredictedCrop] = useState("");
  const [axiosLoading, setAxiosLoading] = useState(false);

  const handleUserInput = (event) => {
    setPredictedCrop("");
    setUserInput({ ...userInput, [event.target.id]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      nitrogen,
      phosphorus,
      potassium,
      tempreature,
      humidity,
      ph,
      rainfall,
    } = userInput;

    if (
      !nitrogen ||
      !phosphorus ||
      !potassium ||
      !tempreature ||
      !humidity ||
      !ph ||
      !rainfall
    ) {
      return alert("Please fill all the inputs");
    }
    try {
      setAxiosLoading(true);
      const res = await axios.post("http://127.0.0.1:5000/", {
        N: userInput.nitrogen,
        P: userInput.phosphorus,
        K: userInput.potassium,
        tempreature,
        humidity,
        ph,
        rainfall,
      });
      setAxiosLoading(false);
      setPredictedCrop(res.data.result);
    } catch (error) {
      setAxiosLoading(false);
      alert(error);
    }
  };

  return (
    <div className="app container">
      <img src={logo}/>
      <p className="heading">SMT.KASHIBAI NAVALE COLLEGE OF ENGINEERING</p>
      <p className="heading">ML Crop Prediction</p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="nitrogen">nitrogen</label>
          <input
            type="text"
            id="nitrogen"
            onChange={handleUserInput}
            value={userInput.nitrogen}
          />
        </div>
        <div className="input-container">
          <label htmlFor="phosphorus">phosphorus</label>
          <input
            type="text"
            id="phosphorus"
            onChange={handleUserInput}
            value={userInput.phosphorus}
          />
        </div>
        <div className="input-container">
          <label htmlFor="potassium">potassium</label>
          <input
            type="text"
            id="potassium"
            onChange={handleUserInput}
            value={userInput.potassium}
          />
        </div>
        <div className="input-container">
          <label htmlFor="tempreature">tempreature</label>
          <input
            type="text"
            id="tempreature"
            onChange={handleUserInput}
            value={userInput.tempreature}
          />
        </div>
        <div className="input-container">
          <label htmlFor="humidity">humidity</label>
          <input
            type="text"
            id="humidity"
            onChange={handleUserInput}
            value={userInput.humidity}
          />
        </div>
        <div className="input-container">
          <label htmlFor="ph">ph value</label>
          <input
            type="text"
            id="ph"
            onChange={handleUserInput}
            value={userInput.ph}
          />
        </div>
        <div className="input-container">
          <label htmlFor="rainfall">rainfall</label>
          <input
            type="text"
            id="rainfall"
            onChange={handleUserInput}
            value={userInput.rainfall}
          />
        </div>
        <div className="input-container">
          <button disabled={axiosLoading}>
            {axiosLoading ? "calculating..." : "calculate"}
          </button>
        </div>
      </form>
      <p className="result">
        {predictedCrop ? (
          <>
            You should plant <span>{predictedCrop}</span>!!
          </>
        ) : (
          `Fill all inputs, and press calculate`
        )}
      </p>
    </div>
  );
}

export default App;
