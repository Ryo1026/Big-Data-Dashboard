import "./App.css";
import gear from "./Vector.png";
import { useEffect, useState } from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";

function App() {
  const [year, setYear] = useState("");
  const [country, setCounter] = useState("");
  const [area, setArea] = useState("empty");

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCounter(event.target.value);
  };
  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  useEffect(() => {
    fetch("https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP019/106")
      .then((res) => res.json())
      .then((data) => console.log(data));
  }, []);

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
            <h2 className="h2-title">人口數、戶數按戶別及性別統計</h2>
            <div className="form">
              <FormControl
                style={{ minWidth: "75px", marginRight: "12px" }}
                size="small"
              >
                <InputLabel id="year-label">年份</InputLabel>
                <Select
                  id="a"
                  labelId="year-label"
                  label="年份"
                  value={year}
                  onChange={handleYearChange}
                >
                  <MenuItem value={106}>106</MenuItem>
                  <MenuItem value={107}>107</MenuItem>
                  <MenuItem value={108}>108</MenuItem>
                  <MenuItem value={109}>109</MenuItem>
                  <MenuItem value={110}>110</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                size="small"
                style={{ minWidth: "165px", marginRight: "12px" }}
              >
                <InputLabel id="country-label">縣/市</InputLabel>
                <Select
                  id="b"
                  labelId="country-label"
                  label="縣/市"
                  value={country}
                  onChange={handleCountryChange}
                >
                  <MenuItem value="">Ten</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                size="small"
                style={{ minWidth: "165px", marginRight: "12px" }}
              >
                <InputLabel id="area-label">區</InputLabel>
                <Select
                  id="c"
                  labelId="area-label"
                  label="區"
                  value={area}
                  onChange={handleAreaChange}
                  disabled={!country}
                >
                  <MenuItem value="empty">請先選擇 縣/市</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" disabled={!year || !country || !area}>
                SUBMIT
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
