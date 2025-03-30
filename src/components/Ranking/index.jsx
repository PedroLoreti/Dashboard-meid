import { useContext, useState } from "react";
import { PedidoContext } from "../../providers/PedidoContext";
import usePedidoCount from "../../hooks/usePedidoCount";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RankingCard } from "./RankingCard";
import styles from "./style.module.scss";
import { useTheme } from "../../providers/ThemeContext";


export const Ranking = () => {
  
  const { isDarkMode } = useTheme()
  const { pedidosList } = useContext(PedidoContext);
  const [dataPedido, setDataPedido] = useState(null);
  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;
  console.log(dataFormatada);

  const pedidoCount = usePedidoCount(pedidosList, dataFormatada);
  const titleClass = `${isDarkMode ? "title-white" : "title-black"}`;
  const pedidoSorted = Object.entries(pedidoCount).sort((a, b) => b[1] - a[1]);
  console.log(pedidoSorted);
  ("");

  const handleChange = (date) => {
    setDataPedido(date);
  };

  return (
    <div className={styles.containerDiv}>
      <h1 className={` ${titleClass} ${styles.titleRanking}`}>Ranking Pedidos</h1>
      <div className={styles.containerMain}>
        

        <div className={styles.containerDate}>
          <label htmlFor="date" className={` ${titleClass} ${styles.label}`}>Data:</label>

          <DatePicker
          selected={dataPedido}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          className={styles.datepicker}
          placeholderText="dd/mm/yyyy"
        />
        </div>

        <ul className={styles.containerList}>
          {pedidoSorted.map((item, index) => (
            <RankingCard key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
