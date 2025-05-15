import { useState } from "react";
import styles from "./style.module.scss";
import { useTheme } from "../../../providers/ThemeContext";

export const RankingCard = ({ item, index }) => {
  const { isDarkMode } = useTheme();

  const titleClass = isDarkMode ? styles.titleWhite : styles.titleBlack;
  const borderClass = isDarkMode
    ? styles.backgroundBlack
    : styles.backgroundWhite;
  const mediaColor = item[1] >= 30 ? "green" : "red";

  const imageUrl = `https://res.cloudinary.com/dilivah9m/image/upload/${item[0].replace(
    / /g,
    "_"
  )}.jpg`;
  const fallbackImage =
    "https://res.cloudinary.com/dilivah9m/image/upload/Icon_unknown.jpg";

  const preposicoes = ["da", "de", "dos", "das", "do", "a", "ao", "na", "no"];

  const nomeArray = item[0].split(" ");

  const nomeExibido = preposicoes.includes(nomeArray[1]?.toLowerCase())
    ? nomeArray.slice(0, 3).join(" ")
    : nomeArray.slice(0, 2).join(" ");

  return (
    <>
      <li>
        <div className={`${borderClass} ${styles.containerCard}`}>
          <span className={`${titleClass} ${styles.position}`}>
            {index + 1}°
          </span>
          <img
            className={styles.imagem}
            src={imageUrl}
            onError={(e) => {
              e.target.onerror = null; // previne loop infinito
              e.target.src = fallbackImage;
            }}
          />
          <p className={`${titleClass} ${styles.paragraph}`}>{nomeExibido}</p>
          <span className={`${mediaColor} ${styles.numPedidos}`}>
            {item[1]}
          </span>
        </div>
      </li>
    </>
  );
};
