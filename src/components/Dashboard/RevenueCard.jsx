import React from "react";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";

const RevenueCard = ({ title, amount, change }) => {
  const { isDarkMode } = useTheme()
  const titleClass = `${isDarkMode ? "title-white" : "title-black"}`;

  return (
    <div className="revenue-card">
      <div className={titleClass}>{title}</div>
      <div className={titleClass}>{amount}</div>
      <div className={titleClass}>{change}</div>
    </div>
  );
};

export default RevenueCard;
