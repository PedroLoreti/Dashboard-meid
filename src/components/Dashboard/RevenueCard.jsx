import React from "react";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";

// Ícones do Lucide (você pode trocar por react-icons se quiser)
import { BarChart, Clock, Timer } from "lucide-react";

const iconMap = {
  "Total Pedidos": <BarChart size={24} />,
  "Media por pedido": <Clock size={24} />,
  "Pedido mais demorado": <Timer size={24} />,
};

const RevenueCard = ({ title, amount, change }) => {
  const { isDarkMode } = useTheme();

  const titleClass = isDarkMode ? styles.titleWhite : styles.titleBlack;
  const cardClass = isDarkMode ? styles.darkCard : styles.lightCard;

  return (
    <div className={`${styles.revenueCard} ${cardClass}`}>
      <div className={styles.icon}>{iconMap[title]}</div>
      <div className={titleClass}>{title}</div>
      <div className={styles.amount}>{amount}</div>
      <div className={styles.change}>{change}</div>
    </div>
  );
};

export default RevenueCard;
