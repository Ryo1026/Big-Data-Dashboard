import "./App.css";
import Header from "./Header";
import Decoration from "./Decoration";
import MyChart from "./MyChart";
import SelectGroup from "./SelectGroup";
import Button from "@mui/material/Button";
import Divider from "./Divider";
import { cityData } from "./city";
import { useState } from "react";
import { useRWD } from "./SelectGroup";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  const [year, setYear] = useState(110);
  const [country, setCounter] = useState("empty");
  const [area, setArea] = useState("empty");
  const isMobile = useRWD();

  const handleYearChange = (event) => {
    setYear(event.target.value);
  };
  const handleCountryChange = (event) => {
    setCounter(event.target.value);
    setArea("empty");
  };
  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <div className="container">
          <Decoration />
          <div className="content">
            <div className="inner-content">
              <h2 className="h2-title">人口數, 戶數按戶別及性別統計</h2>
              <div className="form">
                <SelectGroup
                  year={year}
                  country={country}
                  area={area}
                  cityData={cityData}
                  handleYearChange={handleYearChange}
                  handleCountryChange={handleCountryChange}
                  handleAreaChange={handleAreaChange}
                />
                <Link
                  to={`/${year}/${country}/${area}`}
                  style={{ display: isMobile ? "contents" : "block" }}
                >
                  <Button
                    variant="contained"
                    style={{
                      display: "block",
                      width: isMobile ? "100%" : "auto ",
                    }}
                    disabled={!year || country === "empty" || area === "empty"}
                  >
                    SUBMIT
                  </Button>
                </Link>
              </div>
              <Divider />
              <div className="chart-container">
                <Routes>
                  <Route exact path="/" element={<></>} />
                  <Route path="/:year/:country/:area" element={<MyChart />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
