import styles from "./style.module.scss";
import { useTheme } from "../../../providers/ThemeContext";

export const RankingCard = ({ item, index, isMonthly }) => {
  const { isDarkMode } = useTheme();

  const titleClass = isDarkMode ? styles.titleWhite : styles.titleBlack;
  const borderClass = isDarkMode
    ? styles.backgroundBlack
    : styles.backgroundWhite;

  // Decide regra de cor
  const mediaColor = isMonthly
    ? item.totalPedidos >= 660
      ? "green"
      : "red"
    : item.totalPedidos >= 30
    ? "green"
    : "red";

  const imageUrl = `https://res.cloudinary.com/dilivah9m/image/upload/${item.nome.replace(
    / /g,
    "_"
  )}.jpg`;
  const fallbackImage =
    "https://res.cloudinary.com/dilivah9m/image/upload/Icon_unknown.jpg";

  const preposicoes = ["da", "de", "dos", "das", "do", "a", "ao", "na", "no"];

  const nomeArray = item.nome.split(" ");

  const nomeExibido = preposicoes.includes(nomeArray[1]?.toLowerCase())
    ? nomeArray.slice(0, 3).join(" ")
    : nomeArray.slice(0, 2).join(" ");

  return (
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
          {item.totalPedidos}
        </span>
      </div>
    </li>
  );
};
