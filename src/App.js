import "./App.css";
import gear from "./Vector.png";
import { useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function App() {
  const [year, setYear] = useState("");
  const [country, setCounter] = useState("");
  const [area, setArea] = useState("");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCounter(event.target.value);
  };
  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  return (
    <div className="App">
      <header className="header">
        <span className="nav-title">LOGO</span>
        <div className="setting">
          <img src={gear} alt="gear" />
        </div>
      </header>
      <div className="container">
        <div className="taiwan">TAIWAN</div>
        <div className="content">
          <div className="inner-content">
            <h2>人口數、戶數按戶別及性別統計</h2>

            <FormControl style={{ display: "flex" }}>
              <InputLabel id="year-label">年份</InputLabel>
              <Select
                labelId="year-label"
                id="a"
                value={year}
                label="年份"
                onChange={handleYearChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <InputLabel id="country-label">縣/市</InputLabel>
              <Select
                labelId="country-label"
                id="b"
                value={country}
                label="縣/市"
                onChange={handleCountryChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
              <InputLabel id="area-label">區</InputLabel>
              <Select
                labelId="area-label"
                id="c"
                value={area}
                label="區"
                onChange={handleAreaChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
