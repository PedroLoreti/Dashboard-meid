import { Route, Router, Routes } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard";
import { MainPage } from "../pages/MainPage";
import { RankingPage } from "../pages/RankingPage";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Ranking" element={<RankingPage />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      
    </Routes>
  );
};
