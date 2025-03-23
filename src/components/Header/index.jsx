import Logo from "../../assets/logo.png";
import styles from "./style.module.scss";

export const Header = () => {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" />
      <h1>Ranking de Pedidos</h1>
    </header>
  );
};
