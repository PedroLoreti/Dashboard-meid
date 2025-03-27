import { useContext, useState } from "react";
import { PedidoContext } from "../../providers/PedidoContext";
import usePedidoCount from "../../hooks/usePedidoCount";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { RankingCard } from "./RankingCard";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

export const Ranking = () => {
  const navigate = useNavigate();
  const { pedidosList } = useContext(PedidoContext);
  const [dataPedido, setDataPedido] = useState(null);
  const dataFormatada = dataPedido ? format(dataPedido, "dd/MM/yyyy") : null;
  console.log(dataFormatada);

  const pedidoCount = usePedidoCount(pedidosList, dataFormatada);

  const pedidoSorted = Object.entries(pedidoCount).sort((a, b) => b[1] - a[1]);
  console.log(pedidoSorted);
  ("");

  const handleChange = (date) => {
    setDataPedido(date);
  };

  

  return (
    <div className={styles.containerDiv}>
      <h1 className={styles.titleRanking}>Ranking Pedidos</h1>

      <div className={styles.containerMain}>
        <DatePicker
          selected={dataPedido}
          onChange={handleChange}
          dateFormat="dd/MM/yyyy"
          locale={ptBR}
          className={styles.datepicker}
          popperClassName={styles.customDatepicker}
        />
        <button onClick={() => navigate("/")}>X</button>
        <ul className={styles.containerList}>
          {pedidoSorted.map((item, index) => (
            <RankingCard key={item.id} item={item} index={index} />
          ))}
        </ul>
      </div>
    </div>
  );
};
