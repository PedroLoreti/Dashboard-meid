import styles from "./style.module.scss";
export const RankingCard = ({ item, index }) => {
  const position =
    index === 0 ? "1° " : index === 1 ? "2° " : index === 2 ? "3° " : "";

  return (
    <li>

      <p className={styles.paragraph}>{item[0]}</p>
      <span className={styles.numPedidos}>{item[1]}</span>
    </li>
  );
};
