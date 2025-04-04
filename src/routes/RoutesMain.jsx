import { Route, Routes } from "react-router-dom";
import { Registro } from "../pages/Registro";
import { MainPage } from "../pages/MainPage";
import { RankingPage } from "../pages/RankingPage";

export const RoutesMain = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/Ranking" element={<RankingPage />} />
      <Route path="/Registro" element={<Registro />} />
      
    </Routes>
  );
};

