import React from "react";
import styles from "./style.module.scss";

const RevenueCard = ({ title, amount, change }) => {
  return (
    <div className="revenue-card">
      <div className="revenue-card__header">{title}</div>
      <div className="revenue-card__amount">{amount}</div>
      <div className="revenue-card__change">{change}</div>
    </div>
  );
};

export default RevenueCard;
