import styles from "./style.module.scss";
import { useTheme } from "../../../providers/ThemeContext";

export const RankingCard = ({ item, index }) => {
  const position =
   index === 0 ? "1° " : index === 1 ? "2° " : index === 2 ? "3° " : "";

  const { isDarkMode } = useTheme()

  return (
    <li>
      <p className={`${isDarkMode ? "title-white" : "title-black" } ${styles.paragraph}`}>{item[0]}</p>
      <span className={`${isDarkMode ? "title-white" : "title-black" } ${styles.numPedidos}`}>{item[1]}</span>
    </li>
  );
};
