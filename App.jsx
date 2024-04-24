import { Route, Routes } from "react-router-dom";
import "./index.css";
import "./App.css";
import Weather from "./Components/WeatherWidget/Weather.jsx";
import SolarBarChart from "./Components/SolarWidgets/SolarBarChart/SolarBarChart.jsx";
import BillyTest from "./Testing/BillyTest.jsx";
import AaronTest from "./Testing/AaronTest.jsx";
import JimmyTest from "./Testing/JimmyTest.jsx";

export const App = () => {
  return (
    <>
      {/* SET UP YOUR ROUTES & TEST PAGES HERE ONLY*/}
      <Routes location={location} key={location.key}>
        <Route path="/weather" element={<Weather />} />
        <Route path="/solarbarchart" element={<SolarBarChart />} />
        <Route path="/billytest" element={<BillyTest />} />
        <Route path="/aarontest" element={<AaronTest />} />
        <Route path="/jimmytest" element={<JimmyTest />} />
      </Routes>
    </>
  );
};

export default App;
