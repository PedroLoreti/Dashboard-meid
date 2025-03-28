import Logo from "../../assets/logo.png";
import styles from "./style.module.scss";

export const Header = ({ toggleTheme }) => {

  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" />
      <label class="ui-switch">
        <input type="checkbox" onClick={toggleTheme}/>
        <div class="slider">
            <div class="circle"></div>
        </div>
      </label>
    </header>
  );
};
