import styles from "./style.module.scss";
import { useTheme } from "../../../providers/ThemeContext";

export const RankingCard = ({ item, index }) => {
  const position =
   index === 0 ? "1° " : index === 1 ? "2° " : index === 2 ? "3° " : "";

  const { isDarkMode } = useTheme()
  const titleClass = `${isDarkMode ? "title-white" : "title-black"}`;
  const borderClass = `${isDarkMode ? "background-black" : "background-white"}`;

  const mediaColor = `${item[1] >= 30 ? "green" : "red"}`

  return (
    <li>
      <div className={`${borderClass} ${styles.containerCard}`}>
        <span className={`${titleClass} ${styles.position}`}>{position}</span>
        <p className={`${titleClass} ${styles.paragraph}`}>{item[0]}</p>
        <span className={`${mediaColor} ${styles.numPedidos}`}>{item[1]}</span>
      </div>
    </li>
  );
};
