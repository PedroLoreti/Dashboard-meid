import { useNavigate } from "react-router-dom";
import styles from "./style.module.scss";
export const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <h1>Escolha a section</h1>
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
