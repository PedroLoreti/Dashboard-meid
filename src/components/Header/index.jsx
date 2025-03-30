import Logo from "../../assets/logo.png";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
export const Header = ({ toggleTheme }) => {

  const navigate = useNavigate();
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Logo" onClick={() => navigate("/")} />
      <label class="ui-switch">
        <input type="checkbox" onClick={toggleTheme} />
        <div class="slider">
          <div class="circle"></div>
        </div>
      </label>
    </header>
  );
};
