import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";

export const MainPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme()

  return (
    <div className={styles.container}>
      <div className={styles.typewriter}>
        <h1 className={ `${ isDarkMode ? "title-white" : "title-black" } ${styles.title1}`}>Welcome to Dime Dashboard</h1>
      </div>
      <div className={styles.containerButton}>
        <button onClick={() => navigate("/Ranking")} className="button">
          Ranking
        </button>
        <button onClick={() => navigate("/Dashboard")} className="button">
          DashBoard
        </button>
      </div>
    </div>
  );
};
