import logowhite from "../../assets/logowhite.png";
import logoblack from "../../assets/logoblack.png";

import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../providers/ThemeContext";

export const Header = ({ toggleTheme }) => {

  const navigate = useNavigate();
  const { isDarkMode } = useTheme()

  const logoClass = `${isDarkMode ?  logowhite : logoblack}`;
  return (
    <header className={styles.header}>
      <img src={logoClass} alt="Logo" onClick={() => navigate("/")} />
      <label className="ui-switch">
        <input type="checkbox" onClick={toggleTheme} />
        <div className="slider">
          <div className="circle"></div>
        </div>
      </label>
    </header>
  );
};
