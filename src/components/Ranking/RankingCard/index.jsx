import styles from "./style.module.scss";
import { useTheme } from "../../../providers/ThemeContext";
import imagemPedro from "../../../assets/pedro_emannuel_silva_loreti.jpeg"


export const RankingCard = ({ item, index }) => {

  const { isDarkMode } = useTheme()
  const titleClass = `${isDarkMode ? "title-white" : "title-black"}`;
  const borderClass = `${isDarkMode ? "background-black" : "background-white"}`;

  const mediaColor = `${item[1] >= 30 ? "green" : "red"}`

  return (
    <li>
      <div className={`${borderClass} ${styles.containerCard}`}>
        <span className={`${titleClass} ${styles.position}`}>{index+1}°</span>
        {item[0] === "PEDRO EMANNUEL SILVA LORETI" ? <img className={`${styles.imagem}`} src={imagemPedro}/> : ""}
        <p className={`${titleClass} ${styles.paragraph}`}>{item[0]}</p>
        <span className={`${mediaColor} ${styles.numPedidos}`}>{item[1]}</span>
      </div>
    </li>
  );
};
