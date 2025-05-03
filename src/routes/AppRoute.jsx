import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home/Home";
import Spacecrafts from "../pages/Spacecrafts/Spacecrafts.jsx";
import SpacecraftBuild from "../pages/SpacecraftBuild/SpacecraftBuild.jsx";
import Spacecraft from "../pages/Spacecraft/Spacecraft.jsx";
import Planets from "../pages/Planets/Planets.jsx";
function AppRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/spacecrafts" element={<Spacecrafts />} />
      <Route path="/spacecrafts/build" element={<SpacecraftBuild />} />
      <Route path="/spacecraft/:id" element={<Spacecraft />} />
      <Route path="/planets" element={<Planets />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoute;
