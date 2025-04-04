import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";

export const MainPage = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const titleClass = `${isDarkMode ? "title-white" : "title-black"}`;

  return (
    <div className={styles.container}>
      <div className="typewriter">
        <h1 className={`${titleClass} title1`}>
          Welcome to Dime Consultancy
        </h1>
      </div>
      <div className={styles.containerButton}>
        <button onClick={() => navigate("/Ranking")} className="button">
          Ranking
        </button>
        <button onClick={() => navigate("/Registro")} className="button">
          Registro de Pedidos
        </button>
      </div>
    </div>
  );
};
