import { Route, Routes } from "react-router-dom";
import { Registro } from "../pages/RegistroPage";
import { MainPage } from "../pages/MainPage";
import { RankingPage } from "../pages/RankingPage";
import { DashboardPage } from "../pages/DashboardPage";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Ranking" element={<RankingPage />} />
      <Route path="/Registro" element={<Registro />} />
      <Route path="/Dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

