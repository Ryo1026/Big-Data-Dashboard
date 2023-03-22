import { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export const useRWD = () => {
  const [isMobile, setIsMobile] = useState(false);

  const handleRWD = () => {
    if (window.innerWidth <= 980) setIsMobile(true);
    else if (window.innerWidth > 980) setIsMobile(false);
  };

  useEffect(() => {
    window.addEventListener("resize", handleRWD);
    handleRWD();

    return () => {
      window.removeEventListener("resize", handleRWD);
    };
  }, []);

  return isMobile;
};

const SelectGroup = ({
  year,
  country,
  area,
  cityData,
  handleYearChange,
  handleCountryChange,
  handleAreaChange,
}) => {
  const yearList = [106, 107, 108, 109, 110];
  const isMobile = useRWD();

  return (
    <>
      <FormControl
        size="small"
        fullWidth={isMobile ? true : false}
        style={{ minWidth: "75px", marginRight: isMobile ? "0px" : "12px" }}
      >
        <InputLabel id="year-label">年份</InputLabel>
        <Select
          id="year"
          labelId="year-label"
          label="年份"
          value={year}
          onChange={handleYearChange}
        >
          {yearList.map((year, idx) => (
            <MenuItem key={idx} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        fullWidth={isMobile ? true : false}
        style={{ minWidth: "165px", marginRight: isMobile ? "0px" : "12px" }}
      >
        <InputLabel id="country-label">縣/市</InputLabel>
        <Select
          id="country"
          labelId="country-label"
          label="縣/市"
          value={country}
          onChange={handleCountryChange}
        >
          <MenuItem value="empty" style={{ display: "none" }}>
            <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>請選擇 縣/市</span>
          </MenuItem>
          {cityData.map((city, idx) => (
            <MenuItem key={`city${idx}`} value={city.CityName}>
              {city.CityName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl
        size="small"
        fullWidth={isMobile ? true : false}
        style={{ minWidth: "165px", marginRight: isMobile ? "0px" : "12px" }}
      >
        <InputLabel id="area-label">區</InputLabel>
        <Select
          id="area"
          labelId="area-label"
          label="區"
          value={area}
          onChange={handleAreaChange}
          disabled={country === "empty"}
        >
          <MenuItem value="empty" style={{ display: "none" }}>
            <span style={{ color: "rgba(0, 0, 0, 0.6)" }}>請先選擇 縣/市</span>
          </MenuItem>
          {cityData
            .find((city) => city.CityName === country)
            ?.AreaList.map((area, idx) => (
              <MenuItem key={`area${idx}`} value={area.AreaName}>
                {area.AreaName}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectGroup;
